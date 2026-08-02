import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import db from "./db.js";

const server = new McpServer({
    name: "employee-mcp-server",
    version: "1.0.0"
});

server.registerTool(
    "list_employees",
    {
        title: "List Employees",
        description: "Returns all employees",

        inputSchema: {}
    },

    async () => {

        const [rows] = await db.query(
            "SELECT * FROM employees ORDER BY id"
        );

        return {

            content: [

                {

                    type: "text",

                    text: JSON.stringify(rows, null, 2)

                }

            ]

        };

    }
);



server.registerTool(
    "search_employee",
    {
        title: "Search Employee",

        description: "Find employee by name",

        inputSchema: {

            name: z.string()

        }

    },

    async ({ name }) => {

        const [rows] = await db.query(

            "SELECT * FROM employees WHERE name LIKE ?",

            [`%${name}%`]

        );

        return {

            content: [

                {

                    type: "text",

                    text: JSON.stringify(rows, null, 2)

                }

            ]

        };

    }
);


server.registerTool(
    "employees_by_department",

    {

        title: "Employees By Department",

        description: "Returns employees from one department",

        inputSchema: {

            department: z.string()

        }

    },

    async ({ department }) => {

        const [rows] = await db.query(

            "SELECT * FROM employees WHERE department=?",

            [department]

        );

        return {

            content: [

                {

                    type: "text",

                    text: JSON.stringify(rows, null, 2)

                }

            ]

        };

    }
);


server.registerTool(
    "add_employee",

    {

        title: "Add Employee",

        description: "Adds a new employee",

        inputSchema: {

            name: z.string(),

            department: z.string(),

            salary: z.number()

        }

    },

    async ({ name, department, salary }) => {

        const [result] = await db.query(

            "INSERT INTO employees(name,department,salary) VALUES(?,?,?)",

            [name, department, salary]

        );

        return {

            content: [

                {

                    type: "text",

                    text: `Employee inserted successfully. ID = ${result.insertId}`

                }

            ]

        };

    }
);

server.registerTool(
    "highest_salary",

    {

        title: "Highest Salary",

        description: "Returns highest paid employee",

        inputSchema: {}

    },

    async () => {

        const [rows] = await db.query(

            "SELECT * FROM employees ORDER BY salary DESC LIMIT 1"

        );

        return {

            content: [

                {

                    type: "text",

                    text: JSON.stringify(rows[0], null, 2)

                }

            ]

        };

    }
);



const transport = new StdioServerTransport();

await server.connect(transport);

console.error("Employee MCP Server Started...");