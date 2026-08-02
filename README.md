employee-mcp-server

A Node.js MCP (Model Context Protocol) server that connects Claude to a MySQL employees database, exposing tools to list, search, add, and analyze employee records.

Features
list_employees — returns all employees
search_employee — find employees by name (partial match)
employees_by_department — filter employees by department
add_employee — insert a new employee (name, department, salary)
highest_salary — returns the highest-paid employee
Tech Stack
Node.js (ES modules)
@modelcontextprotocol/sdk — MCP server implementation
mysql2 — MySQL driver
zod — input schema validation
dotenv — local environment variable loading
Project Structure
employee-mcp/
├── index.js          # MCP server: defines and registers the 5 tools
├── db.js              # MySQL connection pool
├── manifest.json       # Desktop Extension (.mcpb) manifest
├── package.json         # Dependencies
├── .env                  # Local DB credentials (not committed)
└── .gitignore
Setup
Install dependencies:
bash
   npm install
Create a .env file in the project root:
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=company
Run the server directly (for testing):
bash
   node index.js
Using with Claude Desktop

This project is packaged as a Desktop Extension (.mcpb) for one-click install:

bash
npm install -g @anthropic-ai/mcpb
npm install --production
mcpb validate manifest.json
mcpb pack .

Then in Claude Desktop: Settings → Extensions → Advanced settings → Extension Developer → Install Extension…, select the generated .mcpb file, and enter your MySQL credentials in the setup screen.

Example Prompts
Prompt	Tool Called
"List all employees"	list_employees
"Search for an employee named Mahesh"	search_employee
"Show employees in the Engineering department"	employees_by_department
"Add a new employee named Mahesh Khatal in Engineering with salary 120000"	add_employee
"Who has the highest salary?"	highest_salary
Notes
.env and node_modules/ are excluded via .gitignore and never committed.
Full build walkthrough and debugging notes available in the accompanying project documentation.
