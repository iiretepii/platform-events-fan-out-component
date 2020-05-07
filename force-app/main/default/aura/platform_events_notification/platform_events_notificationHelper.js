({
    add_message: function(cmp, event, helper, message) {
        var platform_events = cmp.get("v.data");
        platform_events = platform_events.concat([message]);
        cmp.set('v.data', platform_events);
    },
    websocket_error: function(cmp, event, helper, event_name) {
        helper.set_websocket_status(cmp, event, helper,event_name);
        helper.start_connection(cmp, event, helper);
    },
    set_websocket_status: function(cmp, event, helper, status) {
        console.log("Websocket: " + status);
        cmp.set("v.websocket_status", status);
        console.log("v.websocket_status: " + cmp.get("v.websocket_status"));
    },
    start_connection: function(cmp, event, helper) {
        console.log('hit start connection');
        var WebSocket = window.WebSocket || window.MozWebSocket;
        var websocket_url = "wss://heroku-platform-events-staging.herokuapp.com";
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
            helper.websocket_error(cmp, event, helper, "Connection Closed");
        }.bind(this);
        conn.onclose = function() {
            helper.websocket_error(cmp, event, helper, "Connection Closed");
        }.bind(this);
        conn.onmessage = function (message) {
            console.log(message.data);
            var msg_data = JSON.parse(message.data);
            if(msg_data.payload) {
                console.log("has payload");
                helper.add_message(cmp, event, helper, msg_data.payload);
            } else {
                console.log("Message didn't have any data");
            }
        }.bind(this);
    }
})