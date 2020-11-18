import User from '../models/User'

class UserController {

    async show(req, res) {
        const user = await User.findById(req.user)

        if (!user) {
            return res.status(401).json({ error: 'User authentication failed' });
        }

        return res.json({ user: user.display() });
    }

    async index(req, res) {
       
        try {

            const users = await User.find();
            return res.json(users);

        } catch (error) {

            return res.status(400).send();
        }
    }

    async create(req, res) {
        
        try {

            const user = await User.create(req.body);
            return res.status(201).json({ user: user.display() });

        } catch (error) {

            return res.status(400).json({ error: ' error users already exist !' })

        }
    }

    async update(req, res) {
        const { email } = req.body;

        try {
            if (await User.findOne({ email })) {
                res.status(400).json({ error: "User already exists" });
            }

            const users = await User.findById(req.user);

            if (!users) {
                res.json({ error: 'User authentication failed' });
            }

            const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            await user.save();
            return res.status(200).json({ user: user.display() });

        } catch (error) {

            return res.status(400).json({ error: ' Failed to update user ' });
        }
    }

    async destroy(req, res) {

        try {

            const user = await User.findById(req.params.id);
            await user.remove();
            return res.send();

        } catch (error) {

            return res.status(400).json({ error: ' error users already exist' });
        }
    }

    async SoftDelete(req, res) {
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(401).json({ error: 'User authentication failed' });
        }

        user.deleted = true;
        await user.save()

        return res.status(204).send();
    }
}

export default new UserController();

