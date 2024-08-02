"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb+srv://itsahmedad:zE7cEc40YQNMGa7C@cluster0.jq0yrev.mongodb.net/myDatabase');
        console.log('Connected to the database');
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
};
exports.default = connectToDatabase;
//# sourceMappingURL=DBConnect.js.map