const express = require("express")
const app = express();

app.set("view engine", "ejs")

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

const { createClient } = require('pexels');

const client = createClient('VrImi6FbfFJQLmx0JktXbel3K2v1QbprwFFlnGcbwVUvTPAdaN0Qycom');

const mongoose = require("mongoose")
mongoose.connect("mongodb+srv://user:123@cluster0.4vfcf4u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false, 
    }, 
    amenities: {
        type: [String],
        required: false,
        default: []
    },
    accessibility: {
        type: [String],
        required: false,
        default: []
    },
    rating: {
        type: Number,
        required: false,
    },
    reviews: {
        type: [String],
        required: false,
        default: []
    },
    city: {
        type: String
    },
    image: {
      type: String,
    }
})

let Hotel = mongoose.model("Hotel", hotelSchema)

const listSchema = new mongoose.Schema({
    listName: {
        type: String,
        required: true
    },
    hotels: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel' }]
    },
    listOwner: {
        type: String,
    }
})

let List = mongoose.model("List", listSchema)


// Auth0 Setup

const { auth, requiresAuth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3000',
    clientID: 'rfOPUqP87pEfDN4hMdl7eaiFuOE3piQr',
    issuerBaseURL: 'https://gametalk.us.auth0.com'
  };

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get("/" , async (req, res) => {
    // let hotels = await Hotel.find();
    // let imglist = [
    //     'https://images.unsplash.com/photo-1561501900-3701fa6a0864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1621293954908-907159247fc8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1582719508461-905c673771fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1602081115720-72e5b0a254b8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1615722440048-da4ccf6de048?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1559599238-308793637427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw5fHxsdXh1cnklMjBob3RlbHxlbnwwfDB8fHwxNzEyNTEwNzQ1fDA&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1532926381893-7542290edf1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxMHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0NXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1526786220381-1d21eedf92bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxMXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxMnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1605537964076-3cb0ea2ff329?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxM3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1523496922380-91d5afba98a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxNHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxNXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1552566626-2d907dab0dff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxNnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxN3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1619492774026-a9d7bebe06e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxOHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1498503403619-e39e4ff390fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwxOXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyMHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1570213489059-0aac6626cade?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyMXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1517253259615-dff3842d2544?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyMnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1488345979593-09db0f85545f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyM3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1613553474179-e1eda3ea5734?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyNHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1600435335786-d74d2bb6de37?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyNXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1562438668-bcf0ca6578f0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyNnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1611905881164-0d4a145b8956?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyN3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1564134916787-def7de75a7a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyOHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1598605272254-16f0c0ecdfa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwyOXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzMHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0Nnww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1587985064135-0366536eab42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzMXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1592229506151-845940174bb0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzMnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1544986581-efac024faf62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzM3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1605538032404-d7f061325b90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzNHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1534612899740-55c821a90129?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzNXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1567552379232-c32f3d41d353?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzNnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzN3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1592229505801-77b31918d822?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzOHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1439130490301-25e322d88054?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHwzOXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1570206982564-1c5d086f29d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0N3ww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1568084680786-a84f91d1153c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0M3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1600702661712-007433807bc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0NHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1602217401731-1b9d5c2384f7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1469796466635-455ede028aca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0Nnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1509600110300-21b9d5fedeb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0N3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1596178065887-1198b6148b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0OHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw0OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1605311364334-723fff035793?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1582533568805-78a15dcb01b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1590523277760-06f4e9939d1a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1M3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1592229505678-cf99a9908e03?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1NHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1600767421554-069608adb34d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1602002418211-9d76470fa71f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1Nnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1567636788276-40a47795ba4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1N3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1615880480595-f5f9b4fb530e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1OHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1558392164-be227dfe1c98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw1OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1605346576608-92f1346b67d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc0OXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1592229505726-ca121723b8ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1544473243-e8b609021dbf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2M3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1570206986634-afd7cccb68d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2NHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1551441467-4d0f1120ee64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1584132905271-512c958d674a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2Nnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1588861424526-28303cffbdd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2N3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1565329921943-7e537b7a2ea9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2OHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1602002418679-43121356bf41?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw2OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1567624928242-f97fa84bf25c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1603085429201-64dadaec4061?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1609949851943-ff5336d1129f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1582610116397-edb318620f90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3M3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1563493653502-9e270be23596?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3NHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1543060747-53cb56d6b105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3Nnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1556284664-800b14d70a82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3N3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1570214476695-19bd467e6f7a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3OHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1622966955854-20f11775f409?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw3OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1519690889869-e705e59f72e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MHww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1586875419037-52b4423c2c55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4MXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1555341748-a9d443dc3c14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4Mnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4M3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1580041065738-e72023775cdc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4NHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1561409037-c7be81613c1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4NXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1594433575301-cf59b8ada6b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4Nnx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1494194069000-cb794f31d82c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4N3x8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1627750673161-02af15c7c722?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4OHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1556232062-d93fd48d3b45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw4OXx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080',
    //     'https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1ODgwMDR8MHwxfHNlYXJjaHw5MHx8bHV4dXJ5JTIwaG90ZWx8ZW58MHwwfHx8MTcxMjUxMDc1MXww&ixlib=rb-4.0.3&q=80&w=1080'
    //   ]
    // hotels.forEach(async hotel => {
    //     hotel.image = imglist[Math.floor(Math.random() * imglist.length)];
    //     await hotel.save();
    // })
    res.render("home", {isLoggedIn: req.oidc.isAuthenticated()})
})

app.get("/app" , async (req, res) => {
    res.render("app", {isLoggedIn: req.oidc.isAuthenticated()})
})

app.get("/lists", requiresAuth(), async (req, res) => {
    let lists = await List.find({})
    res.render("lists" , {isLoggedIn: req.oidc.isAuthenticated(), lists: lists})
})

app.get("/search", async(req, res)=>{
    let searchString = req.query.place
    let city = req.query.city
    let results = await Hotel.find({city: city})
    res.render("search", {results: results, isLoggedIn: req.oidc.isAuthenticated(), city: city})
})

app.get("/hotel/:id" , requiresAuth(), async(req, res) => {
    let myHotel = await Hotel.find({_id: req.params.id})
    let myLists = await List.find({listOwner: req.oidc.user.sub})
    res.render("hotel" , {isLoggedIn: req.oidc.isAuthenticated(), hotel: myHotel[0], lists: myLists})
})

app.get("/list/:id" , async(req, res) => {
    let list = await List.find({_id: req.params.id}).populate('hotels')
    console.log(list[0])
    res.render("list", {isLoggedIn: req.oidc.isAuthenticated(), list: list[0]})
})

app.post("/api/list/new" , requiresAuth(), async(req, res) => {
    let newList = new List({
        listName: req.body.listName,
        listOwner: req.oidc.user.sub
    })
    await newList.save();
    res.redirect("/lists")
})

app.get("/api/list/update" , requiresAuth(), async (req, res) => {
    let listUpdate = await List.findOneAndUpdate({_id: req.query.id}, { $addToSet: { hotels: req.query.hotelId }})
    res.redirect("/list/" + listUpdate._id)
})

app.listen(3000, () => {
    console.log("Server up!")
})