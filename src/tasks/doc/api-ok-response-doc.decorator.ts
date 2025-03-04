import { ApiOkResponse } from "@nestjs/swagger";

export const ApiOkResponseDoc = ()=> ApiOkResponse({
        description: 'Returns a list that indicates the success for each movie creation attempt',
        example: {
            "result": {
                "A New Hope": {
                    "success": true,
                    "message": "Created successfully (id 532)"
                },
                "The Empire Strikes Back": {
                    "success": false,
                    "message": "Movie already exists"
                },
                "Return of the Jedi": {
                    "success": false,
                    "message": "Movie already exists"
                },
                "The Phantom Menace": {
                    "success": false,
                    "message": "Movie already exists"
                },
                "Attack of the Clones": {
                    "success": true,
                    "message": "Created successfully (id 536)"
                },
                "Revenge of the Sith": {
                    "success": true,
                    "message": "Created successfully (id 537)"
                }
            }
        }
    })