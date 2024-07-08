const Message = require('../model/messageModel');

module.exports.addMessage = async (req, res,next) => {
    try {
        const {from, to, message} = req.body;
        //console.log('Adding message:', { from, to, message });
        const data = await Message.create({
            message:{ text: message },
            users: [from, to],
            sender: from
        })

        if(data) {
            return res.json({msg:'Message added successfully', status: true})
        }
        return res.json({msg:'Message was failed to be added', status: false})
    } catch (ex) {
        next(ex)
    }
}

module.exports.getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.query; // Extract 'from' and 'to' from query parameters
        //console.log('Fetching messages:', { from, to });

        if (!from || !to) {
            return res.status(400).json({ msg: 'Missing required parameters: from or to' });
        }

        const messages = await Message.find({
            users: { $all: [from, to] },
        }).sort({ updatedAt: 1 });

        //console.log('Messages:', messages);

        const showMessages = messages.map((msg) => ({
            fromSelf: msg.sender.toString() === from,
            message: msg.message.text,
        }));

        //console.log('Mapped messages:', showMessages);
        res.json({ messages: showMessages });
    } catch (ex) {
       // console.error('Error in getMessages controller:', ex);
        next(ex);
    }
};
