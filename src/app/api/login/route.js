import { SignJWT } from "jose";
import { getJwtSecretKey } from "@/libs/auth";
import { API_URL } from "@/libs/auth";
import axios from "axios";
import { NextResponse } from "next/server";
import moment from "moment";

export async function POST(request) {
    moment.locale("id");
    const body = await request.json();
    /* const 
    const token = await new SignJWT({
        username: body.username,
    })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("30s")
        .sign(getJwtSecretKey());
    const response = NextResponse.json(
        { success: true },
        { status: 200, headers: { "content-type": "application/json" } }
    );
    response.cookies.set({
        name: "token",
        value: token,
        path: "/",
        httpOnly: true,
    });
    return response; */
    //initialize formData
    const formData = new FormData();

    //append data to formData
    formData.append('email', body.username);
    formData.append('password', body.password);

    try {
        const res = await axios.post(`${API_URL}/api/login`, formData);
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );

        //set token
        response.cookies.set({
            name: "token",
            value: res.data.token,
            // path: "/",
            // httpOnly: true,
            // secure: true,/
            // maxAge: 60 * 60 * 24,
            maxAge: new Date(Date.now() + 30 * 1000), // 30 seconds
            // maxAge: moment().seconds(+30).format(), // 30 seconds
        });
        
        return response;

        
        /*
        response.cookies.set({
            name: "token",
            value: res.data.token,
            httpOnly: true,
            // secure: true,
            path: "/",
            // expires: 60 * 60 * 24,
        });

        return response; */
        /* let jsonResponse = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" }}
        ); */
        // console.log(response.data.token);
        
        //set token
        // document.cookie = "name=token;" + '' + "token=" + response.data.token; + "; path=/ httpOnly=true";
        // document.cookie = "name=token; SameSite=None; Secure";
        // document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

        // jsonResponse.cookies.set({
        //     name: "token",
        //     value: response.data.token,
        //     path: "/",
        //     httpOnly: true,
        // });
        // console.log(response);

        // return NextResponse.json({ success: true });
        // return jsonResponse;
    } catch (error) {
        // console.log(error);
        return NextResponse.json({ success: false, error: error });
    }

    /* if (body.username === "admin" && body.password === "admin") {
        const token = await new SignJWT({
            username: body.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30s")
            .sign(getJwtSecretKey());
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
            httpOnly: true,
        });
        return response;
    }
    return NextResponse.json({ success: false }); */
}