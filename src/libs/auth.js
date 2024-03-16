// import { jwtVerify } from "jose";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";
import Cookies from "universal-cookie";
import { NextResponse } from "next/server";
import moment from "moment";

export const API_URL = process.env.NEXT_PUBLIC_API_BACKEND;
const cookies = new Cookies();
const accessToken = cookies.get("token") ?? null;
moment.locale("id");

export function getJwtSecretKey() {
    const secret = process.env.NEXT_PUBLIC_JWT_SECRET_KEY;
    if (!secret) {
        throw new Error("JWT Secret key is not matched");
    }
    return new TextEncoder().encode(secret);
}

export async function verifyJwtToken(token) {
    try {
        // const { payload } = await jwtVerify(token, getJwtSecretKey());
        if (!token) {
            return null;
        }
        
        return token;
        // const { payload } = await token;

    } catch (error) {
        return null;
    }
}

function isAccessTokenValid(token) {
    try {
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decoded.exp > currentTime; // Check expiration time
    } catch (error) {
        console.log('isAccessTokenValid error ', error);
        return false; // Invalid token
    }
}

export async function refreshToken(token) {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/refresh`);

        if (!response.data) {
            console.log('Refresh token failed');
            throw new Error('Refresh token failed'); // Handle errors
        }

        const newToken = response.data.token;
        
        cookies.set({
            name: "token",
            value: newToken,
            // path: "/",
            // httpOnly: true,
            // secure: true,
            // maxAge: 60 * 60 * 24,
            maxAge: new Date(Date.now() + 30 * 1000), // 30 seconds
            // maxAge: moment().seconds(+30).format(), // 30 seconds
        });

        return newToken;

        // const user = await response.json();
        // return user.data.token; // Return the new access token
    } catch (error) {
        console.log('Refresh token error ', error);
        // router.push("/login");
        const redirect = NextResponse.redirect(new URL(`/login`));
        return redirect;
    }
}

export async function logout() {
    try {
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/logout`);

        cookies.remove("token");

        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        
        return response;
        // const user = await response.json();
        // return user.data.token; // Return the new access token
    } catch (error) {
        return NextResponse.json({ success: false, error: "Can't logout" });
        // console.log('Refresh token error ', error);
        // router.push("/login");
    }
}

/**
 * Custom fetch for axios
 */

export const apiFetch = axios.create({
    baseURL: `${API_URL}`,
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
})

apiFetch.interceptors.request.use(async (config) => {
    if (isAccessTokenValid(config.headers.Authorization.split(' ')[1])) {
        return config; // Access token is valid
    }

    const newAccessToken = await refreshToken(accessToken);
    config.headers.Authorization = `Bearer ${newAccessToken}`;
    return config;
});

/* export async function apiFetch(endpoint, method,  = {}) {
    const url = `${API_URL}${endpoint}`;

    await axios({
        url,
        method,
        ...additionalConfig
    })
    .then((response) => {
        console.log(response);
        //set token on cookies
        // Cookies.set('token', response.data.token);
        
        //redirect to dashboard
        // Router.push('/dashboard');
    })
    .catch((error) => {
        console.log(error.response.data);
        //assign error to state "validation"
        // setValidation(error.response.data);
    });

    // try {
    //     const response = await fetch(url, options);

    //     if (!response.ok) {
    //         // console.log(response);
    //         // return new Error(`Error fetching ${url}: ${response.statusText}`);
    //     }

    //     return await response.json();
    // } catch (error) {
    //     console.error(error);
    //     throw error;
    // }
} */