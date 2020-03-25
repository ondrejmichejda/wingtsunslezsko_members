<?php
require('Db.php');


class Events
{
    public static function Connect($hostname, $dbname, $dbuser, $dbpwd)
    {
        Db::connect($hostname, $dbname, $dbuser, $dbpwd);
    }

    // Events part

    public static function GetEvents()
    {
        // Get row data from DB
        $rowEvents = array(
            'id' => '',
            'date' => '',
            'time' => '',
            'memberlimit' => '',
            'members' => '');

        $rowEvents = Db::queryAll('
                SELECT *
                FROM event WHERE date >= ?
                ORDER BY date ASC', date("Y-m-d"));

        // Move row data to object data
        $events = array();
        foreach ($rowEvents as $ev) {
            $event = new EventItemClass($ev['id'], $ev['date'], $ev['time'], $ev['memberlimit'], $ev['members']);
            array_push($events, $event);
        }

        return $events;
    }

    public static function GetEventsLimit($total)
    {
        // Get row data from DB
        $rowEvents = array(
            'id' => '',
            'date' => '',
            'time' => '',
            'memberlimit' => '',
            'members' => '');

        $rowEvents = Db::queryAll('
                SELECT *
                FROM event WHERE members < memberlimit AND date >= ?
                ORDER BY date ASC
                LIMIT ?', date("Y-m-d"), $total);

        // Move row data to object data
        $events = array();
        foreach ($rowEvents as $ev) {
            $event = new EventItemClass($ev['id'], $ev['date'], $ev['time'], $ev['memberlimit'], $ev['members']);
            array_push($events, $event);
        }

        return $events;
    }

    public static function GetEvent($id){
        $rowEvent = Db::queryOne('
                SELECT *
                FROM event
                WHERE id=?
        ', $id);

        $result = new EventItemClass($rowEvent['id'], $rowEvent['date'], $rowEvent['time'], $rowEvent['memberlimit'], $rowEvent['members']);
        return $result;
    }

    public static function ChangeEvent($id, $date, $time, $memberlimit){
        Db::query('
                UPDATE event
                SET date=?, time=?, memberlimit=? 
                WHERE id=?'
            , $date, $time, $memberlimit, $id);
    }

    public static function AddMember($name, $surname, $eventid){

        // Insert new member into members table
        Db::query('
                INSERT INTO members (name, surname, eventid)
                VALUES (?, ?, ?)'
            , $name, $surname, $eventid);

        // Calculate members in event table
        Db::query('
                CALL EventMembersCount (?)'
            , $eventid);
    }

    public static function GetMembers($eventid){
        // Get row data from DB
        $rowMembers = array(
            'eventid' => '',
            'name' => '',
            'surname' => '');

        $rowMembers = Db::queryAll('
                SELECT *
                FROM members
                WHERE eventid=?
        ', $eventid);

        // Move row data to object data
        $members = array();
        foreach ($rowMembers as $m) {
            $member = new MemberItemClass($m['eventid'], $m['name'], $m['surname']);
            array_push($members, $member);
        }
        return $members;
    }

    public static function GetEventsFilter($filterCriteria)
    {
        // Get row data from DB
        $rowEvents = array(
            'id' => '',
            'date' => '',
            'time' => '',
            'memberlimit' => '',
            'members' => '');

        if (is_a($filterCriteria, 'FilterCriteria')) {

            $rowEvents = Db::queryAll('
            SELECT *
            FROM event
            WHERE YEAR(date) LIKE ? AND MONTH(date) LIKE ? AND DAYOFWEEK(date) LIKE ? AND members LIKE ? 
            AND date >= ?
            ORDER BY date ASC
            ', $filterCriteria->year, $filterCriteria->month, $filterCriteria->day, $filterCriteria->members, $filterCriteria->fromDate);
        }
        else{
            echo('Error - wrong object passed as filter criteria.');
            return null;
        }

        // Move row data to object data
        $events = array();
        foreach ($rowEvents as $ev) {
            $event = new EventItemClass($ev['id'], $ev['date'], $ev['time'], $ev['memberlimit'], $ev['members']);
            array_push($events, $event);
        }

        return $events;
    }

    public static function AddEvent($date, $time, $memberlimit) {
        $datestamp = date('Y-m-d', strtotime($date));
        Db::query('
                INSERT INTO event (date, time, memberlimit)
                VALUES (?, ?, ?)'
            , $datestamp, $time, $memberlimit);
    }

    public static function RemoveEvent($id) {
        Db::query('
                DELETE FROM event
                WHERE id=?
        ', $id);
    }

    public static function AddEventsMulti ($year, $month, $dayArr, $time, $memberlimit) {
        foreach ($dayArr as $day){
            if($day != null) {
                //$dates = self::getDays($year, $month, $day);
                $dates = self::getDays($year, $month, $day);
                foreach ($dates as $date) {
                    $datestamp = date('Y-m-d', $date);
                    Db::query('
                    INSERT INTO event (date, time, memberlimit)
                    VALUES (?, ?, ?)'
                        , $datestamp, $time, $memberlimit);
                }
            }
        }
    }

    // Actuality part

    public static function GetAct(){
        $rowAct = Db::queryOne('
                SELECT *
                FROM actuality
                ');
        return $rowAct['text'];
    }

    public static function SetAct($text){
        Db::query('
                UPDATE actuality
                SET text=?
                WHERE id=1'
            , $text);
    }

    /** **/
    /** Private functions **/

    private static function getDays($year, $month, $day)
    {
        $allDays = array();

        for($d=1; $d<=31; $d++)
        {
            $time=mktime(12, 0, 0, $month, $d, $year);
            if (date('m', $time)==$month) {
                $allDays[] = $time;
            }
        }

        $result = array();

        foreach ($allDays as $d){
            if(date('N', $d) == $day) {
                $result[] = $d;
            }
        }

        return $result;
    }

    private static function Log($text){
        echo'<br/>';
        echo $text;
    }

}

class EventItemClass
{
    public $id;
    public $date;
    public $time;
    public $memberlimit;
    public $members;

    // non DB properties
    public $dayName;
    public $old = 'old';

    public function __construct($id, $date, $time, $memberlimit, $members)
    {
        $this->id = $id;

        $temp = strtotime($date);
        $this->date = date("d.m.Y", $temp);
        $this->dayName = $this->GetDayName($temp);

        $this->old = date('Y-m-d') > $date ? true : false;

        $temp = strtotime($time);
        $this->time =  date("G:i", $temp);

        $this->memberlimit = $memberlimit;
        $this->members = $members;
    }

    private function GetDayName($date){
        $dayNo = date('N', $date);

        switch ($dayNo){
            case 1:
                $dayName = 'Pondělí';
                break;
            case 2:
                $dayName = 'Úterý';
                break;
            case 3:
                $dayName = 'Středa';
                break;
            case 4:
                $dayName = 'Čtvrtek';
                break;
            case 5:
                $dayName = 'Pátek';
                break;
            case 6:
                $dayName = 'Sobota';
                break;
            case 7:
                $dayName = 'Neděle';
                break;
            default:
                $dayName = 'Šestek';
                break;
        }

        return $dayName;
    }
}

class MemberItemClass
{
    public $eventid;
    public $name;
    public $surname;

    public function __construct($eventid, $name, $surname)
    {
        $this->eventid = $eventid;
        $this->name = $name;
        $this->surname = $surname;
    }
}

class FilterCriteria{
    public $year;
    public $month;
    public $day;
    public $members;
    public $fromDate;

    public function __construct($year, $month, $day, $members, $old)
    {
        $this->year = $year != '' ? $year : '%';
        $this->month = $month != 0 ? $month : '%';
        $this->day = $day != 0 ? $day : '%';
        $this->members = $members != '' ? $members : '%';

        $this->fromDate = $old ? date('Y-m-d', strtotime('1990-01-01')) : date('Y-m-d');
    }
}

// Gallery
class Gallery
{
    public static $path = '../deepwork_galerie/';

    public static function GetPictures()
    {
        $dir = self::$path;
        $pics = scandir($dir);

        $output = array();

        array_splice($pics, 0, 2);
        foreach ($pics as $pic) {
            array_push($output, $dir . $pic);
        }
        return $output;
    }

    public static function DeletePictures($pics){
        $deleted = array();
        foreach($pics as $pic){
            if(unlink($pic))
                array_push($deleted, $pic);
        }
        return implode(',', $deleted);
    }

    public static function AddPictures($files){
            $target_dir = self::$path;
            move_uploaded_file($files, $target_dir);
    }
}

