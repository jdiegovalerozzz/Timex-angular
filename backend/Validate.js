class Validate {
    constructor() { }

    validType(params) {
        try {
            for (let i = 0; i < params.values.length; i++) {
                if (typeof params.values[i] !== params.types[i]) {
                    return false;
                }
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Type validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    validSpecialChar(value, chars) {
        try {
            for (let char of chars) {
                if (value.includes(char)) {
                    throw new Error(`Invalid character found: ${char}`);
                }
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Special character validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    validLength(value, maxLength) {
        try {
            if (value.length > maxLength) {
                throw new Error(`Invalid length: maximum allowed is ${maxLength}`);
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Length validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    validDate(date, format) {
        try {
            const regex = new RegExp(format);
            if (!regex.test(date)) {
                throw new Error(`Invalid date format: expected ${format}`);
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Date validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    validEmpty(value) {
        try {
            if (value === null || value === undefined || value === '') {
                throw new Error('Value cannot be empty');
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Empty value validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    validEmail(value) {
        try {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            if (!regex.test(value)) {
                throw new Error('Invalid email format');
            }
            return true;
        } catch (error) {
            this.errorHandler({
                sts: 'error',
                shortMsg: 'Email validation failed',
                detailMessage: error.message,
                code: 404
            });
            return false;
        }
    }

    errorHandler(error) {
        console.error('Validation Error:', JSON.stringify(error, null, 2));
    }
}

export default Validate;