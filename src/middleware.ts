import { type NextRequest, NextResponse } from "next/server";

export default function middleware (request:NextRequest){
    const response=NextResponse.next();
    const themePreference=request.cookies.get("theme");
    if(!themePreference){
        response.cookies.set("theme","dark");
    }
     return response;
}

export const config={
matcher:"/home",
}