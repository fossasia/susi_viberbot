var $ref = $('#message');
var $sub = $('#submitMessage');

$sub.on('click',function(event){
	event.preventDefault();
	var $value = $ref.val();
	$.ajax({
		url: 'https://intense-crag-83953.herokuapp.com/postToPublic',
		method: 'POST',
		data: {
			val: $value
		},
		success: function(){
			alert("Posted Successfully");
		},
		error: function(){
			alert("Sorry couldn't make it!");
		}
	});
})