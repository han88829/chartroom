$(function () {
    const url = 'http://room.hanbei.men';
    let _username = '';
    let _$inputname = $('#name');
    let _$loginButton = $('#loginbutton');
    let _$chattextarea = $('#chatmessage');
    let socket = io.connect(url);

    //设置用户名，当用户登录的时候触发
    let setUsername = () => {

        _username = _$inputname.val().trim();    //得到输入框中用户输入的用户名

        //判断用户名是否存在
        if (_username) {
            socket.emit('login', { username: _username });   //如果用户名存在，就代表可以登录了，我们就触发登录事件，就相当于告诉服务器我们要登录了
        }
        else {
            alert('请输入用户名！');
        }
    };



    /*前端事件*/
    _$loginButton.on('click', function (event) {    //监听按钮的点击事件，如果点击，就说明用户要登录，就执行setUsername函数
        setUsername();
    });

    /*socket.io部分逻辑*/
    socket.on('loginResult', (data) => {
        /** 
        * 如果服务器返回的用户名和刚刚发送的相同的话，就登录 
        * 否则说明有地方出问题了，拒绝登录 
        */
        if (data.code === 0) {
            // 登陆成功，切换至聊天室页面  
            showChatRoom();
        }
        else if (data.code === 1) {
            alert('用户已登录！');
        }
        else {
            alert('登录失败！');
        }
    })

    // 登录成功显示聊天对话框
    let showChatRoom = () => {
        $('#loginbox').hide('slow');
        _$loginButton.off('click');
        /** 
        * 显示聊天界面，并显示一行文字，欢迎用户 
        */
        $(`<div class="title">欢迎${_username}来到ddvdd聊天室</div>`).insertBefore($("#content"));
        $("#chatbox").show('slow');
    }

    let sendMessage = function () {
        /** 
         * 得到输入框的聊天信息，如果不为空，就触发sendMessage 
         * 将信息和用户名发送过去 
         */
        let _message = _$chattextarea.val();

        if (_message) {
            socket.emit('sendMessage', { username: _username, message: _message });
        }
        else {
            alert('请输入发送消息！');
        }
    };

    /*聊天事件*/
    _$chattextarea.on('keyup', function (event) {
        if (event.keyCode === 13) {
            sendMessage();
            _$chattextarea.val('');
        }
    });

    socket.on('receiveMessage', (data) => {

        /** 
         * 
         * 监听服务器广播的消息
         */
        showMessage(data);
    })
    //显示消息
    let showMessage = function (data) {
        console.log(data)
        //先判断这个消息是不是自己发出的，然后再以不同的样式显示  
        if (data.username === _username) {
            $("#content").append(`<p class='self-message'><span class='msg'>${data.message}</span><span class='name'> :${data.username}</span></p>`);
        } else {
            $("#content").append(`<p class='other-message'><span class='name'>${data.username}: </span><span class='msg'>${data.message}</span></p>`);
        }
    };

});