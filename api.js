"use strict";

/*==========================================================
  API CONFIGURATION
==========================================================*/

const API = {

    URL: "YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL",

    VERSION: "3.0"

};

/*==========================================================
  BUILD QUERY STRING
==========================================================*/

function buildQuery(params = {}) {

    const query = new URLSearchParams();

    Object.keys(params).forEach(key => {

        if (
            params[key] !== undefined &&
            params[key] !== null
        ) {

            query.append(key, params[key]);

        }

    });

    return query.toString();

}

/*==========================================================
  COMMON REQUEST
==========================================================*/

async function api(action, params = {}) {

    params.action = action;

    const url =
        API.URL +
        "?" +
        buildQuery(params);

    try {

        const response = await fetch(url, {

            method: "GET",

            cache: "no-store"

        });

        if (!response.ok) {

            throw new Error(
                "HTTP " + response.status
            );

        }

        return await response.json();

    }

    catch (error) {

        console.error(error);

        return {

            success: false,

            message: error.message

        };

    }

}
