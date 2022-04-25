<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<div>
    <table>
        <tr>
            <th>아이디 : </th>
            <td><input type="text" id="memId"></td>
        </tr>
        <tr>
            <th>비밀번호 : </th>
            <td><input type="password" id="pwd"></td>
        </tr>
    </table>
    <input type="button" onclick="confirmLogin()" value="로그인">
    <input type="button" onclick="joinView()" value="회원가입">
</div>
</html>
<script>
   function confirmLogin() {
       if ($('#memId').val() === '') {
           alert('아이디를 입력해주세요.');
           $('#memId').focus();
           return false;
       }
       if ($('#pwd').val() === '') {
           alert('비밀번호를 입력해주세요.');
           $('#pwd').focus();
           return false;
       }
       $.ajax({
           type:'post',
           url : '/login',
           data:JSON.stringify({
               memId:$('#memId').val(),
               pwd:$('#pwd').val()
           }),
           dataType: 'json',
           contentType: 'application/json; charset=UTF-8',
           success : function (response) {
               location.href = "main?memId=" + $('#memId').val();
           },
           error : function (xhr, status, error) {
               var err = JSON.parse(xhr.responseText);
               if (err.status === 9999) {
                   alert("아이디 혹은 비밀번호를 일치하지 않습니다.");
               }
           }
       })
   }

   function joinView() {
       location.href = "/join";
   }
</script>
