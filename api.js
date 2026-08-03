/*==========================================================
  Pause & Play Gym Management System
  File      : api.js
  Version   : 3.0
  Purpose   : Central API Client
==========================================================*/

"use strict";

/*==========================================================
  CONFIGURATION
==========================================================*/

const API = {

    URL: "https://script.google.com/macros/s/AKfycbwVVpKy9oZBYJGpN9u-iLn2tXF8b489ZceBbE_N1FFBs9mXvzCWiyaUcc0Mkm-qKcs9Uw/exec",

    TIMEOUT: 30000

};

/*==========================================================
  RESPONSE PARSER
==========================================================*/

async function parseResponse(response) {

    if (!response.ok) {

        throw new Error(

            "HTTP " + response.status

        );

    }

    return await response.json();

}

/*==========================================================
  GET REQUEST
==========================================================*/

async function apiGet(action, params = {}) {

    params.action = action;

    const query = new URLSearchParams(params);

    const response = await fetch(

        API.URL + "?" + query.toString(),

        {

            method: "GET",

            cache: "no-store"

        }

    );

    return parseResponse(response);

}

/*==========================================================
  POST REQUEST
==========================================================*/

async function apiPost(action, data = {}) {

    data.action = action;

    const formData = new URLSearchParams();

    Object.keys(data).forEach(key => {

        if (

            data[key] !== undefined &&

            data[key] !== null

        ) {

            formData.append(

                key,

                data[key]

            );

        }

    });

    const response = await fetch(

        API.URL,

        {

            method: "POST",

            body: formData

        }

    );

    return parseResponse(response);

}

/*==========================================================
  SAFE REQUEST
==========================================================*/

async function request(method, action, data = {}) {

    try {

        if (method === "GET") {

            return await apiGet(

                action,

                data

            );

        }

        return await apiPost(

            action,

            data

        );

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: error.message

        };

    }

}
