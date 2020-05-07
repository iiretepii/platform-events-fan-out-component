({
	doInit: function(cmp, evt, helper) {
		console.log('hit the init method');
		cmp.set("v.data", []);
		var columns = [
			{label: 'Record Id', fieldName: 'Record_ID__c', type: 'text'},
			{label: 'Message', fieldName: 'Record_Message__c', type: 'text'}
		];
		cmp.set("v.columns", columns);
		helper.start_connection(cmp, evt, helper);
	}
})