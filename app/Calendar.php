<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Calendar extends Model
{
    protected $fillable = [
        'title', 'start', 'end', 'category', 'detail', 'user_id'
    ];
    protected $table = 'calendars';
    protected $guarded = [];
}
