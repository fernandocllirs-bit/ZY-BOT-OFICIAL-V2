const cache = new Map();

module.exports = {

    create(userId) {

        cache.set(userId, {

            title: "",
            description: "",
            color: "#FFD1DC",
            image: "",
            footer: ""

        });

    },

    get(userId) {

        return cache.get(userId);

    },

    update(userId, data) {

        const current = cache.get(userId);

        if (!current) return;

        cache.set(userId, {

            ...current,
            ...data

        });

    },

    delete(userId) {

        cache.delete(userId);

    }

};