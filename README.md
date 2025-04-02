# Calculator Microservice (sit737-2025-prac4c)

This Node.js microservice extends the functionality of a basic calculator by adding advanced arithmetic operations and implementing robust error handling.

## Requirements

* Node.js
* npm
* Git

## Setup and Installation Steps (app4c.js)

1.  **Initialize npm project:**
    ```bash
    npm init -y
    ```
    This command creates a `package.json` file with default settings, which manages project dependencies and scripts. The output shows the contents of the generated `package.json` file.
2.  **Install Express.js:**
    ```bash
    npm install express
    ```
    This command installs the Express.js framework, a web application framework for Node.js, and adds it to the `dependencies` section of `package.json`. The output confirms successful installation and displays audit information.
3.  **Install Winston:**
    ```bash
    npm install winston
    ```
    This command installs the Winston logging library, used for structured logging in the microservice, and adds it to the `dependencies` section of `package.json`. The output confirms successful installation and displays audit information.
4.  **Run the microservice:**
    ```bash
    node app4c.js
    ```
    This command starts the Node.js application (`app4c.js`), launching the calculator microservice. The first time this command was run, there was no output, meaning the server was likely started but no requests were made. The second time, the server started, and logs were generated due to client requests.

## API Endpoints

The microservice provides the following API endpoints:

* **Basic Operations:**
    * `GET /add?num1={number}&num2={number}`
    * `GET /subtract?num1={number}&num2={number}`
    * `GET /multiply?num1={number}&num2={number}`
    * `GET /divide?num1={number}&num2={number}`
* **Advanced Operations:**
    * `GET /exponent?num1={number}&num2={number}`
    * `GET /sqrt?num1={number}`
    * `GET /modulo?num1={number}&num2={number}`

## Error Handling

* Invalid input parameters result in a 400 error.
* Division by zero results in a 400 error.
* Square root of a negative number results in a 400 error.

## Logging

* Winston is used for logging.
* Logs are written to `logs/combined.log` and `logs/error.log`.
* Console logging is enabled.

## Log Explanation

The following log outputs were generated when running the application:

* `Calculator microservice listening at http://localhost:3001`: This line indicates that the server has successfully started and is listening for requests on port 3001.
* `info: New sqrt operation requested: 25 {"service":"calculator-microservice"}`: This line indicates a successful request to the `/sqrt` endpoint with the parameter `num1` set to 25. The `info` level indicates this is a general informational log.
* `error: Invalid input parameters {"service":"calculator-microservice"}`: This line indicates an error occurred due to invalid input parameters. The `error` level signifies an error condition. This occurred due to other requests that were made that didn't have valid parameters.
* `info: New sqrt operation requested: 30 {"service":"calculator-microservice"}`: Another successful request to the sqrt endpoint, with num1 being 30.
* `info: New sqrt operation requested: 300 {"service":"calculator-microservice"}`: Another successful request to the sqrt endpoint, with num1 being 300.
* The `{"service":"calculator-microservice"}` part of each log entry indicates the service name, which helps in identifying the source of the log message in a microservices environment.

## Error Handling Report

A 1-page report detailing microservice error handling strategies (Circuit Breaker, Retry, Fallback) is included in the repository.

## Usage Examples

* `http://localhost:3000/add?num1=5&num2=3`
* `http://localhost:3000/sqrt?num1=16`
* `http://localhost:3000/modulo?num1=10&num2=3`

## View Logs (Windows)

```powershell
Get-Content -Path logs/combined.log -Wait