({
    add_message: function(cmp, event, helper, message) {
        var platform_events = cmp.get("v.data");
        platform_events = platform_events.concat([message]);
        cmp.set('v.data', platform_events);
    },
    websocket_error: function(cmp, event, helper, event_name) {
        console.log(`Websocket: ${event_name}`);
        helper.start_connection(cmp, event, helper);
    },
    do_message: function(cmp, event, helper, message) {
        // console.log("message: ", message.data);
        helper.add_message(cmp, event, helper, JSON.parse(message.data));
    },
    set_websocket_status: function(cmp, event, helper, status) {
        console.log(`Websocket: ${status}`);
    },
    start_connection: function(cmp, event, helper) {
        window.WebSocket = window.WebSocket || window.MozWebSocket;
        var websocket_url = `wss://${window.location.hostname}`;
        var conn = new WebSocket(websocket_url);
        conn.onopen = function () {
            helper.set_websocket_status(cmp, event, helper, 'Connected');
            console.log("Websocket: READY");
            setInterval(function() {
                console.log("stayin alive!");
                conn.send('{"ab":"cd"}');
            },50000);
        }.bind(this);
        conn.onerror = function (error) {
            helper.websocket_error(cmp, event, helper, "ERROR!");
        }.bind(this);
        conn.onclose = function() {
            helper.websocket_error(cmp, event, helper, "Connection Closed");
        }.bind(this);
        conn.onmessage = function (message) {
            helper.do_message(cmp, event, helper, message);
        }.bind(this);
    }
})