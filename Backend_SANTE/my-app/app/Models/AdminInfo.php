<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdminInfo extends Model
{
    use HasFactory;

    protected $table = 'admin_info';

    // protected $fillable = [
    //     'name', 'email', 'contact', 'password', 'selectedService', 'period', 'contactEmail', 'Bussiness_ID'
    // ];
    protected $fillable = [
        'name',
        'email',
        'contact',
        'password',
        'selectedService',
        'period',
        'contactEmail',
        'business_id'
    ];
    // Auto-increment Bussiness_ID starting from 111111
    // public static function boot()
    // {
    //     parent::boot();
        
    //     static::creating(function ($model) {
    //         $lastBussinessId = static::max('Bussiness_ID');
    //         $model->Bussiness_ID = $lastBussinessId ? $lastBussinessId + 1 : 111111;
    //     });
    // }
}