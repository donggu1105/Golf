<!DOCTYPE html>
<html>
<head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<div>
    <table>
        <tr>
            <th>아이디 : </th>
            <td><input type="text" id="loginId"></td>
        </tr>
        <tr>
            <th>비밀번호 : </th>
            <td><input type="password" id="loginPwd"></td>
        </tr>
    </table>
    <input type="button" onclick="confirmLogin()" value="로그인">
    <input type="button" onclick="registUser()" value="회원가입">
</div>
</html>
<script>
   function confirmLogin() {
       if ($('#loginId').val() === '') {
           alert('아이디를 입력해주세요.');
           $('#loginId').focus();
           return false;
       }
       if ($('#loginPwd').val() === '') {
           alert('비밀번호를 입력해주세요.');
           $('#loginPwd').focus();
           return false;
       }
       $.ajax({
           type:'post',
           url : '/confirmLogin',
           data:JSON.stringify({
               memId:$('#loginId').val(),
               pwd:$('#loginPwd').val()
           }),
           dataType: 'json',
           contentType: 'application/json; charset=UTF-8',
           success : function (response) {
               if (response.resultCode === '0000') {
                   console.log('성공');
               }else{
                   console.log('실패');
               }
           },
           error : function () {
               alert('에러');
           }
       })
   }

   function registUser() {
       location.href = ''
   }
</script>
