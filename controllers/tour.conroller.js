const { getDb } = require("../utils/dbConnections")

module.exports.getAllTours = async (req, res, next)=>{

    try {
        // const {limit, page} =req.query;

        const db = getDb();

        const tools = await db
            .collection("tools")
            .find({})
            .toArray();

        res.status(200).json({
            success: true,
            data: tools
        });
    } catch (error) {
        next(error)
    }
}

module.exports.saveATour = async (req, res, next)=>{

    try {
        const db = getDb();
        const tour = req.body;
    
        const result = await db.collection("tours").insertOne(tour);

    
        if (!result.insertedId) {
          return res.status(400).send({ 
            status: false,
            error: "Something went wrong!" });
        }
    
        res.send({ 
            success: true,
            message: `Tool added with id: ${result.insertedId}` });
      } catch (error) {
        next(error);
      }
}