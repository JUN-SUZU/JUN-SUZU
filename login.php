<?php
 
//セッションを使う
session_start();
 
// 変数の初期化
$id = '';
$password = '';
$err_msg = array();
 
// POST送信があるかないか判定
if (!empty($_POST)) {
  // 各データを変数に格納
  $id = $_POST['id'];
  $password = $_POST['password'];
 
  // eメールアドレスバリデーションチェック
  // 空白チェック
  if ($id === '') {
    $err_msg['id'] = '入力必須です';
  }
  // 文字数チェック
  if (strlen($id) > 65) {
    $err_msg['id'] = '64文字以内で入力してください';
  }
  // パスワードバリデーションチェック
  // 空白チェック
  if ($password === '') {
    $err_msg['password'] = '入力してください';
  }
  // 文字数チェック
  if (strlen($password) > 33 || strlen($password) < 5) {
    $err_msg['password'] = '６文字以上32文字以内で入力してください';
  }
  // 形式チェック
  if (!preg_match("/^[a-zA-Z0-9]+$/", $password)) {
    $err_msg['password'] = '半角英数字で入力してください';
  }
}
$data = array(
  'id' => 'JUN',
  'password' => '111111'
);
$_SESSION['id'] = $id;
//マイページへ遷移
header('Location: mypage.php');
exit;
 
?>