const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcrypt');
const User = require('./src/Models/user');
const ServiceProvider = require('./src/Models/serviceProvider');
const Category = require('./src/Models/category');
const Service = require('./src/Models/services');
const FAQ = require('./src/Models/faq');
const Coupon = require('./src/Models/coupon');
const ProviderType = require('./src/Models/providerType');
const Admin = require('./src/Models/admin');
const PrivacyPolicy = require("./src/Models/privacyPolicy");
const TermsNConditions = require('./src/Models/termsNConditions');
const AboutUs = require('./src/Models/aboutUs');

require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((error) => console.error("Connection error:", error));

app.post("/register-admin", async (req, res) => {
    const { name, image, email, password } = req.body;

    try {
        const check = await Admin.findOne({ email: email });

        if (check) {
            return res.status(409).json({ success: false, message: "User already exists" });
        } else {
            const EncPassword = await bcrypt.hash(password, 10);
            const user = await Admin.create({
                name,
                image,
                email,
                password: EncPassword,
            });
            return res.status(201).json({ success: true, user });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!password) {
        return res.status(400).json({ success: false, message: "Password is required" });
    };

    try {
        const user = await Admin.findOne({ email });

        if (user && await bcrypt.compare(password, user.password)) {
            return res.status(200).json({
                success: true,
                username: user.name,
                userImage: user.image
            });
        } else {
            return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

app.get('/get-users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users" });
    }
});

app.post('/add-users', async (req, res) => {
    const { name, image, email, type, phNumber, availableRange, availability, accept } = req.body;
    if (!name || !email || !type || !phNumber || !availableRange || accept) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (image) {
        try {
            const newUser = new User({
                name, image, email, type, phNumber, availableRange, availability, accept,
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    else {
        try {
            const newUser = new User({
                name, email, type, phNumber, availableRange, availability, accept,
            });
            await newUser.save();
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
});

app.get('/get-providers', async (req, res) => {
    try {
        const serviceProviders = await ServiceProvider.find();
        res.status(200).json(serviceProviders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-providers', async (req, res) => {
    const { name, providerType, phNumber, mobileNumber, addresses, availableRange, taxes, availability, accepted, image } = req.body;
    if (!name || !providerType || !phNumber || !mobileNumber || !addresses || !availableRange || !taxes) {
        return res.status(400).json({ error: 'Missing required fields' });

    }
    else if (!accepted) {
        const notAccepted = false;
        try {
            const newServiceProvider = new ServiceProvider({
                name, providerType, phNumber, mobileNumber, addresses, availableRange, taxes, availability, notAccepted: accepted, image,
            });
            await newServiceProvider.save(); res.status(201).json(newServiceProvider);
        } catch (error) {
            console.error('Error saving new service provider:', error);
            res.status(500).json({ error: error.message });
        }
    }
    else {
        try {
            const newServiceProvider = new ServiceProvider({
                name, providerType, phNumber, mobileNumber, addresses, availableRange, taxes, availability, accepted, image,
            });
            await newServiceProvider.save(); res.status(201).json(newServiceProvider);
        } catch (error) {
            console.error('Error saving new service provider:', error);
            res.status(500).json({ error: error.message });
        }
    }
});

app.get('/get-categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-categories', async (req, res) => {
    const { image, name, color, description, featured, order } = req.body;
    if (!name || !color || !description || order === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    } try {
        const newCategory = new Category({ image, name, color, description, featured, order, });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        console.error('Error saving new category:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-services', async (req, res) => {
    try {
        const services = await Service.find().populate('provider').populate('categories');
        res.status(200).json(services);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-services', async (req, res) => {
    const { image, name, provider, price, discPrice, categories, available } = req.body;
    if (!name || !provider || price === undefined || !categories) {
        return res.status(400).json({ error: 'Missing required fields' });
    } try {
        const newService = new Service({
            image, name, provider, price, discPrice, categories, available,
        });
        await newService.save(); res.status(201).json(newService);
    } catch (error) {
        console.error('Error saving new service:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-faqs', async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-faqs', async (req, res) => {
    const { question, answer, faq_category } = req.body;
    if (!question || !answer || !faq_category) {
        return res.status(400).json({ error: 'Missing required fields' });
    } try {
        const newFAQ = new FAQ({ question, answer, faq_category, });
        await newFAQ.save();
        res.status(201).json(newFAQ);
    } catch (error) {
        console.error('Error saving new FAQ:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-coupons', async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.status(200).json(coupons);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-coupons', async (req, res) => {
    const { code, discount, description, expires_at, enabled } = req.body;
    if (!code || discount === undefined || !description || !expires_at) {
        return res.status(400).json({ error: 'Missing required fields' });
    } try {
        const newCoupon = new Coupon({ code, discount, description, expires_at, enabled, });
        await newCoupon.save(); res.status(201).json(newCoupon);
    } catch (error) {
        console.error('Error saving new coupon:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-dashboard-metrics', async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalServiceProviders = await ServiceProvider.countDocuments();
        const totalCategories = await Category.countDocuments();
        res.status(200).json({ totalUsers, totalServiceProviders, totalCategories });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/get-provider-types', async (req, res) => {
    try {
        const providerTypes = await ProviderType.find();
        res.status(200).json(providerTypes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/add-provider-types', async (req, res) => {
    const { name, commission, disabled } = req.body;
    if (!name || commission === undefined) {
        return res.status(400).json({ error: 'Missing required fields' });
    } try {
        const newProviderType = new ProviderType({
            name, commission, disabled,
        });
        await newProviderType.save();
        res.status(201).json(newProviderType);
    } catch (error) {
        console.error('Error saving new provider type:', error);
        res.status(500).json({ error: error.message });
    }
});

app.get("/get-privacy-policy", async (req, res) => {
    try {
        const policy = await PrivacyPolicy.findOne();
        if (!policy) {
            return res.status(404).json({ message: "Privacy Policy not found" });
        }
        res.status(200).json({ privacyPolicy: policy.content });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Privacy Policy", error });
    }
});

app.post("/add-privacy-policy", async (req, res) => {
    const { content } = req.body;
    try {
        let policy = await PrivacyPolicy.findOne();
        if (policy) {
            policy.content = content;
            policy.updatedAt = Date.now();
        } else {
            policy = new PrivacyPolicy({ content });
        }
        await policy.save();
        res.status(200).json({ message: "Privacy Policy saved successfully!", policy });
    } catch (error) {
        res.status(500).json({ message: "Error saving Privacy Policy", error });
        console.log("Error: ", error);
    }
});

app.get("/get-terms-and-conditions", async (req, res) => {
    try {
        const conditions = await TermsNConditions.findOne();
        if (!conditions) {
            return res.status(404).json({ message: "Terms and Conditions not found" });
        }
        res.status(200).json({ termsNConditions: conditions.content });
    } catch (error) {
        res.status(500).json({ message: "Error fetching Privacy Policy", error });
    }
});

app.post("/add-terms-and-conditions", async (req, res) => {
    const { content } = req.body;
    try {
        let conditions = await TermsNConditions.findOne();
        if (conditions) {
            conditions.content = content;
            conditions.updatedAt = Date.now();
        } else {
            conditions = new TermsNConditions({ content });
        }
        await conditions.save();
        res.status(200).json({ message: "Privacy Policy saved successfully!", conditions });
    } catch (error) {
        res.status(500).json({ message: "Error saving Privacy Policy", error });
        console.log("Error: ", error);
    }
});

app.get("/get-about-us", async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        if (!aboutUs) {
            return res.status(404).json({ message: "About Us not found" });
        }
        res.status(200).json({ aboutUs: aboutUs.content });
    } catch (error) {
        res.status(500).json({ message: "Error fetching About Us", error });
    }
});

app.post("/add-about-us", async (req, res) => {
    const { content } = req.body;
    try {
        let aboutUs = await AboutUs.findOne();
        if (aboutUs) {
            aboutUs.content = content;
            aboutUs.updatedAt = Date.now();
        } else {
            aboutUs = new AboutUs({ content });
        }
        await aboutUs.save();
        res.status(200).json({ message: "About Us saved successfully!", aboutUs });
    } catch (error) {
        res.status(500).json({ message: "Error saving About Us", error });
        console.log("Error: ", error);
    }
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});