<?php
// **************** Download from ftp the latest JArltech CSV

// define some variables
$ftp_server = 'muusikamaja.ee';
$ftp_user_name = 'hool.muusikamaja.ee';
$ftp_user_pass = 'mulonheameel';
$local_file = 'downloaded.csv';
$server_file = '49075_32899.csv';

// set up basic connection
$conn_id = ftp_connect($ftp_server);

// login with username and password
$login_result = ftp_login($conn_id, $ftp_user_name, $ftp_user_pass);

// try to download $server_file and save to $local_file
if (ftp_get($conn_id, $local_file, $server_file, FTP_BINARY)) {
    echo "Successfully downloaded $local_file<br>";
} else {
    echo "There was a problem\n";
}

// close the connection
ftp_close($conn_id);

// **************** Remove the first line of the CSV

if ($handle = fopen("downloaded.csv", "c+")) {             // open the file in reading and editing mode
    if (flock($handle, LOCK_EX)) {               // lock the file, so no one can read or edit this file 
        while (($line = fgets($handle, 4096)) !== FALSE) { 
            if (!isset($write_position)) {        // move the line to previous position, except the first line
                $write_position = 0;
            } else {
                $read_position = ftell($handle); // get actual line
                fseek($handle, $write_position); // move to previous position
                fputs($handle, $line);           // put actual line in previous position
                fseek($handle, $read_position);  // return to actual position
                $write_position += strlen($line);    // set write position to the next loop
            }
        }
        fflush($handle);                         // write any pending change to file
        ftruncate($handle, $write_position);     // drop the repeated last line
        flock($handle, LOCK_UN);                 // unlock the file
    }
    fclose($handle);
	echo "First line removed!<br>";
}

// **************** Replace all commas "," with dots "." because of the price	
	
$path_to_file = 'downloaded.csv';
$file_contents = file_get_contents($path_to_file);
$file_contents = str_replace(",",".",$file_contents);
file_put_contents($path_to_file,$file_contents);
echo "Replaced all commas with dots!<br>";
echo "Updating prices and quantities!<br>";

// **************** Update prices and quantities in Database

// set local variables
$connect = mysql_connect("localhost","estoniac_hool","1WhoLetDogs") or die('Could    not connect: ' . mysql_error());
$handle = fopen("downloaded.csv", "r");

// connect to mysql and select database or exit 
mysql_select_db("products", $connect);

// loop content of csv file, using comma as delimiter
while (($data = fgetcsv($handle, 1000, ';', '"')) !== false) {
$stock = $data[4];
$price =  $data[10];
$Product_ID = $data[11];

echo $Product_ID . " €" . $price . " (stock: " . $stock . ")<br>";


$query = 'SELECT original_number FROM products';
if (!$result = mysql_query($query)) {
continue;
} 

if ($line = mysql_fetch_array($result, MYSQL_ASSOC)) {

// entry exists update
$query = "UPDATE products SET price ='$price' , quantity = '$stock'
WHERE original_number = '$Product_ID'";


mysql_query($query);
if (mysql_affected_rows() <= 0) {

// no rows where affected by update query
}
} else {
// entry doesn't exist continue or insert...
}

mysql_free_result($result);
}

fclose($handle);
mysql_close($connect);

?>