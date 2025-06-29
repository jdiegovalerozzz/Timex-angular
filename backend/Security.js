class Security {
    constructor() {
   
        this.methodPermission = new Map();
        this.optionPermission = new Map();
    }

    async loadPermissions() {
        try {
            console.log("loadPermissions Executed");
            let r = await global.db.exe("security", "loadPermission", []);
            for (let i = 0; i < r.rows.length; i++) {
              
                let key = `${r.rows[i].profile_id}_${r.rows[i].object_de}_${r.rows[i].method_de}`;
                let value = true;
                this.methodPermission.set(key, value);
            }

            let res = await global.db.exe("security", "loadMenu", []);
            for (let i = 0; i < res.rows.length; i++) {
                
                let key = `${res.rows[i].profile_id}_${res.rows[i].menu_de}_${res.rows[i].menu_function_de}`;
                let value = true;
                this.optionPermission.set(key, value);
            }
            console.log("loadPermissions completed successfully");

        } catch (err) {
            console.error("loadPermissions failed:", err);
        }
    }

    hasPermissionMethod(obj) {
        let key = `${obj.profile}_${obj.objectName}_${obj.methodName}`;
        if (this.methodPermission.has(key)) {
            return this.methodPermission.get(key);
        } else {
            return false;
        }
    }

    getPermissionOption(req) {
        let val;
        let i = 0;
        const opt = [];

        this.optionPermission.forEach((value, key) => {
            val = key.split('_');
            if (req.session.profile === parseInt(val[0], 10) ) {
                opt[i] = {
                    option: val[1],
                    funct: val[2]
                };
                i++;
            }
        });

        return opt;
    }

    async exeMethod(req) {
        try {
            const ModuleClass = (await import(`./BO/${req.body.objectName}.js`)).default;
            const obj = new ModuleClass();
            const methodName = req.body.methodName;

            if (typeof obj[methodName] === "function") {
                return await obj[methodName](req.body.params);
            } else {
                throw new Error(`Method ${methodName} do not exist on ${req.body.objectName}`);
            }
        } catch (error) {
            console.error("Error on exeMethod:", error);
            throw error;
        }
    }
}

export default Security;