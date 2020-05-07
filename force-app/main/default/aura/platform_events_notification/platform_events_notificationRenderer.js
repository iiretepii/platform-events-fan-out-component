({
	init: function (cmp, event, helper) {
		cmp.set('v.columns', [
			{label: 'Event ID', fieldName: 'Id', type: 'text'},
			{label: 'Record ID', fieldName: 'Record_ID__c', type: 'text'},
			{label: 'Record Message', fieldName: 'Record_Message__c', type: 'text'},
		]);
        helper.start_connection(cmp, event, helper);
	}
})