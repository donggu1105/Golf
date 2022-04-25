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
        <tr>
            <th>이름 : </th>
            <td><input type="text" id="name"></td>
        </tr>

        <tr>
            <th>전화번호 : </th>
            <td><input type="text" id="phone"></td>
        </tr>
        <tr>
            <th>이메일 : </th>
            <td><input type="text" id="email"></td>
        </tr>
    </table>
    <input type="button" onclick="joinUser()" value="회원가입">
</div>
</html>
<script>
    function validateJoin() {
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
        if ($('#name').val() === '') {
            alert('이름을 입력해주세요.');
            $('#name').focus();
            return false;
        }
        if ($('#phone').val() === '') {
            alert('전화번호를 입력해주세요.');
            $('#phone').focus();
            return false;
        }
        if ($('#email').val() === '') {
            alert('이메일을 입력해주세요.');
            $('#email').focus();
            return false;
        }
        return true;
    }

   function joinUser() {

        if (!validateJoin()) {
            return;
        }

       $.ajax({
           type:'post',
           url : '/join',
           data:JSON.stringify({
               memId:$('#memId').val(),
               pwd:$('#pwd').val(),
               name:$('#name').val(),
               phone:$('#phone').val(),
               email:$('#email').val()
           }),
           dataType: 'json',
           contentType: 'application/json; charset=UTF-8',
           success : function (response) {
               // location.href = "/main?memId=" + $('#memId').val();
               location.href = "/login";
           },
           error : function (request, status, error) {
               alert(error);
           }
       })
   }

</script>
