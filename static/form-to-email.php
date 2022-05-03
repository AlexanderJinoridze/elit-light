<?php
    /*ini_set('display_errors', 1); 
    error_reporting(E_ALL);*/
    /* at the top of 'check.php' */
    if ( $_SERVER['REQUEST_METHOD']=='GET' && realpath(__FILE__) == realpath( $_SERVER['SCRIPT_FILENAME'] ) ) {
        /* 
           Up to you which header to send, some prefer 404 even if 
           the files does exist for security
        */
        header( 'HTTP/1.0 403 Forbidden', TRUE, 403 );

        /* choose the appropriate page to redirect users */
        die('error, access denied');

    }


    /* Namespace alias. */
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    
    /* Include the Composer generated autoload.php file. */
    require '../vendor/autoload.php';

    /* If you installed PHPMailer without Composer do this instead: */
    /*
    require 'C:\PHPMailer\src\Exception.php';
    require 'C:\PHPMailer\src\PHPMailer.php';
    require 'C:\PHPMailer\src\SMTP.php';
    */

    /* Create a new PHPMailer object. Passing TRUE to the constructor enables exceptions. */
    $mail = new PHPMailer(TRUE);

    /* Open the try/catch block. */
    try {
        $mail->SMTPDebug = 1;
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        $mail->Username = 'openservertestmail@gmail.com';  //openservertestmail@gmail.com
        $mail->Password = '--19test96--';

        /* Set the mail sender. */
        $mail->setFrom($_POST['email']);

        /* Add a recipient. */
        $mail->addAddress('openservertestmail@gmail.com');  //openservertestmail@gmail.com

        $mail->addReplyTo($_POST['email']);

        /* Set the subject. */
        $mail->Subject = $_POST['subject'];

        /* Set the mail message body. */
        $mail->Body = $_POST['message'].' ';

        /* Finally send the mail. */
        $mail->send();
    }
    catch (Exception $e)
    {
        die();
        /* PHPMailer exception. */
        echo $e->errorMessage();
    }
    catch (\Exception $e)
    {
        die();
        /* PHP exception (note the backslash to select the global namespace Exception class). */
        echo $e->getMessage();
    }
?>