# nodejs-http-event-listener
A base http event listener

To run
```
npm install
NODE_ENV=production PORT=%listening_port% QUEUE_URL=%where_to_publish_events% node ./bin/www
```

Will reply with a liveness response for get request to '/'.

Will process event-publish request by passing it forward to the defined queue url as a post request.

All other paths will be answered with relevant error messages.
