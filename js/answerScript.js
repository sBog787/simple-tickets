var modal = document.getElementById("notificationModal");

$(document).ready(function () {
    $('.notificationRef').bind('click', function (e) {
        e.preventDefault();
        modal.style.display = "block";
        var appealId = this.id;
        sendAjaxForm(appealId, 'ajax_form', '../wp-content/plugins/apelacio/php/controllers/AppealController.php');

        $("#ajax_answer").submit(
            function (e) {
                e.preventDefault();
                var id = appealId.substring(16);
                var answer = $('#answer').val();
                var appeal = $('#text').text();
                $.ajax({
                    url: '../wp-content/plugins/apelacio/php/controllers/AnswerController.php',
                    type: 'POST',
                    data: {id: id, answer: answer, appeal: appeal},
                    dataType: 'html',
                    success: () => {
                        alert('Ваш ответ отправлен!')
                    }
                });
                var modal = document.getElementById("notificationModal");
                modal.style.display = "none";
                // document.getElementById('message_' + id).remove();
                var removeStatement = '[data-id=' + id + ']';
                $(removeStatement).remove();
                document.getElementById('ajax_answer').reset();
                return false;
            }
        );
    });

    $(document).on('click', '.notice-dismiss', function (e) {
        var target = $(e.currentTarget);
        var parent = target.parents('#message');
        var messageId = parent.attr('data-id');

        $.ajax({
            url: '../wp-content/plugins/apelacio/php/controllers/AnswerController.php',
            type: "POST",
            data: {id: messageId},
            dataType: 'html'
        });
    })
});


function sendAjaxForm (appealId, ajax_form, url) {
    var id = appealId.substring(16);
    $.ajax({
        url: url,
        type: "POST",
        data: {id: id},
        success: (response) => {
            var result = $.parseJSON(response);
            console.log(result);
            $('#appealType').html(result[0].name);
            $('#secondName').html(result[0].second_name);
            $('#firstName').html(result[0].first_name);
            $('#patronymic').html(result[0].patronymic);
            $('#email').html(result[0].email);
            $('#text').html(result[0].text);
        },
        dataType: 'html'
    });
}

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
