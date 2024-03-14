import jwt, { type JwtHeader, type JwtPayload } from "jsonwebtoken";
const SECRET_TOKEN = process.env.SECRET_TOKEN as string;

const encode = (payload: JwtPayload, options?: jwt.SignOptions) => {
	return jwt.sign(payload, SECRET_TOKEN, options);
};

const decode = (token: string, options?: jwt.DecodeOptions) => {
	return jwt.decode(token, options);
};

const validate = (token: string, options?: jwt.VerifyOptions) => {
	try {
		jwt.verify(token, SECRET_TOKEN, options);
		return true;
	} catch (error) {
		return false;
	}
};

export { encode, decode, validate };
export default {
	encode,
	decode,
	validate,
};
