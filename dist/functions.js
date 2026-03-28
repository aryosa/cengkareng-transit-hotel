       // grab the initial top offset of the navigation 
        var stickyNavTop = $('#menu').offset().top;
        
        // our function that decides weather the navigation bar should have "fixed" css position or not.
        var stickyNav = function(){
          var scrollTop = $(window).scrollTop(); // our current vertical position from the top
               
          // if we've scrolled more than the navigation, change its position to fixed to stick to top,
          // otherwise change it back to relative
          if (scrollTop > stickyNavTop) { 
              $('#menu').addClass('sticky');
        
          } else {
              $('#menu').removeClass('sticky'); 
       
          }
      };

      stickyNav();
      // and run it again every time you scroll
      $(window).scroll(function() {
        stickyNav();
      }); 

       $('.carousel').carousel();
      
        $(".imgLiquidFill").imgLiquid({
            fill: true,
            horizontalAlign: "center",
            verticalAlign: "top"
        });

        //set the width for carousel image background
        var winwidth = $(window).width()-230;
        //alert(winwidth);
        $('.carousel-img-bg').css('width',winwidth);

        // start room carousel dynamically
         $("#superiorCarousel,#deluxeCarousel,#familyCarousel").carousel({
             interval: 3000,
             pause: "hover"
         });

      //Back to Top
      if ($('#back-to-top').length) {
          var scrollTrigger = 100, // px
              backToTop = function () {
                  var scrollTop = $(window).scrollTop();
                  if (scrollTop > scrollTrigger) {
                      $('#back-to-top').addClass('show');
                  } else {
                      $('#back-to-top').removeClass('show');
                  }
              };
          backToTop();
          $(window).on('scroll', function () {
              backToTop();
          });
          $('#back-to-top,#back-home').on('click', function (e) {
              e.preventDefault();
              $('html,body').animate({
                  scrollTop: 0
              }, 700);
          });
      }

      $('.main-menu .nav-link,#sec-footer a').on('click', function (e) {
              e.preventDefault();
              var selid = $(this).attr('data-sel');
              $('.main-menu .nav-link,#sec-footer a').removeClass('active');
              $(this).addClass('active');
              //alert(selid);
              $('html, body').animate({
          scrollTop: $("#"+selid).offset().top-100
        }, 1000);
          }); 


      //JSONS
      $.getJSON( "assets/jsons/promotions.json", function( data ) {
          $.each(data,function(index, value){
             //console.log(data);

             //desktop promo title
             $('#promo1-title,#promo1mob-title').html(value.promo[0].title);
             $('#promo1-wa').attr("href",value.promo[0].whatsapp);
             $('#promo1-subtitle').html(value.promo[0].subtitle);
             $('#promo1-description').html(value.promo[0].description);

                  //loop
                  var rules = value.promo[0].rules;
                  var output ="";
                  var i;
                        for (i = 0; i < rules.length; i++) { 
                          output += "<li>" + rules[i] + "</li>";
                        }
                    
                   $('#promo1-rules').html(output);

                   var subrules = value.promo[0].subrules;
                   var suboutput ="";
                   var j;
                        for (j = 0; j < subrules.length; j++) { 
                          suboutput += "<li>" + subrules[j] + "</li>";
                        }
                   $('#promo1-subrules').html(suboutput);     
          });
          $.each(data,function(index, value){
             //console.log(data);

             //desktop promo title
             $('#promo2-title,#promo2mob-title').html(value.promo[1].title);
             $('#promo2-wa').attr("href",value.promo[1].whatsapp);
             $('#promo2-subtitle').html(value.promo[1].subtitle);
             $('#promo2-description').html(value.promo[1].description);

             //loop
                  var rules = value.promo[1].rules;
                  var output ="";
                  var i;
                        for (i = 0; i < rules.length; i++) { 
                          output += "<li>" + rules[i] + "</li>";
                        }
                    
                   $('#promo2-rules').html(output);

                   var subrules = value.promo[1].subrules;
                   var suboutput ="";
                   var j;
                        for (j = 0; j < subrules.length; j++) { 
                          suboutput += "<li>" + subrules[j] + "</li>";
                        }
                   $('#promo2-subrules').html(suboutput);  
             
          });
          $.each(data,function(index, value){
             //console.log(data);

             //desktop promo title
             $('#promo3-title,#promo3mob-title').html(value.promo[2].title);
             $('#promo3-wa').attr("href",value.promo[2].whatsapp);
             $('#promo3-subtitle').html(value.promo[2].subtitle);
             $('#promo3-description').html(value.promo[2].description);

             //loop
                  var rules = value.promo[2].rules;
                  var output ="";
                  var i;
                        for (i = 0; i < rules.length; i++) { 
                          output += "<li>" + rules[i] + "</li>";
                        }
                    
                   $('#promo3-rules').html(output);

                   // var subrules = value.promo[2].subrules;
                   // var suboutput ="";
                   // var j;
                   //      for (j = 0; j < subrules.length; j++) { 
                   //        suboutput += "<li>" + subrules[j] + "</li>";
                   //      }
                   // $('#promo3-subrules').html(suboutput);  
          });
      });

      //superior
      $.getJSON( "assets/jsons/rooms.json", function( data ) {
      //var output = "<ul>";
        $.each(data,function(index, value){
            //console.log(value);
            //room 1
            $('#room1-name,#room1mob-name').html(value.rooms[0].title);
            $('#room1-size,#room1mob-size').html(value.rooms[0].roomsize);
            $('#room1-bed,#room1mob-bed').html(value.rooms[0].bedtype);
            $('#room1-checkin,#room1mob-checkin').html(value.rooms[0].checkin);
            $('#room1-rate,#room1mob-rate').html(value.rooms[0].rate);
            $('#room1-publishrate,#room1mob-publishrate').html(value.rooms[0].displayrate);


                  //loop
                  var facilities = value.rooms[0].facilities;
                  var output ="";
                  var i;
                        for (i = 0; i < facilities.length; i++) { 
                          output += facilities[i] + ", ";
                        }
                  //console.log(facilities);
                  // $.each(facilities,function(){
                      
                  //     output += facilities[0].value1+', ';
                  //     output += facilities[0].value2+', ';
                  //     output += facilities[0].value3+', ';
                  //     output += facilities[0].value4+', ';
                  //     output += facilities[0].value5+', ';
                  //     output += facilities[0].value6+', ';
                  //     output += facilities[0].value7+', ';
                  //     output += facilities[0].value8;
                  //     //console.log(output);
                      

                  // });
                  $('#room1-facilities,#room1mob-facilities').html(output);
                  $('#room1-compliments,#room1mob-compliments').html(value.rooms[0].compliments);

                  

            // output += "<li>" + value.rooms[0].title + "</li>";
            // output += "<li>" + value.rooms[1].title + "</li>";
            // output += "<li>" + value.rooms[2].title + "</li>";
        }); //end each

       //deluxe
       $.each(data,function(index, value){
            //console.log(value);
            //room 1
            $('#room2-name,#room2mob-name').html(value.rooms[1].title);
            $('#room2-size,#room2mob-size').html(value.rooms[1].roomsize);
            $('#room2-bed,#room2mob-bed').html(value.rooms[1].bedtype);
            $('#room2-checkin,#room2mob-checkin').html(value.rooms[1].checkin);
            $('#room2-rate,#room2mob-rate').html(value.rooms[1].rate);
            $('#room2-publishrate,#room2mob-publishrate').html(value.rooms[1].displayrate);


                  
                  //loop
                  var facilities        = value.rooms[1].facilities,
                      extracompliments  = value.rooms[1].extracompliments;
                  var output ="",outputxcom ="";
                       var i;
                        for (i = 0; i < facilities.length; i++) { 
                          output += facilities[i] + ", ";
                        }

                        var j;
                        for (j = 0; j < extracompliments.length; j++) { 
                          outputxcom += extracompliments[j] + ", ";
                        }
                  
                  //console.log(output);
                  //output = output.replace("undefined,", "");
                  $('#room2-extracompliments,#room2mob-extracompliments').html("Extra compliments: "+outputxcom);
                  $('#room2-facilities,#room2mob-facilities').html(output);
                  $('#room2-compliments,#room2mob-compliments').html(value.rooms[1].compliments);

                  

           
        }); //end each

       //family
       $.each(data,function(index, value){
            //console.log(value);
            //room 1
            $('#room3-name,#room3mob-name').html(value.rooms[2].title);
            $('#room3-size,#room3mob-size').html(value.rooms[2].roomsize);
            $('#room3-bed,#room3mob-bed').html(value.rooms[2].bedtype);
            $('#room3-checkin,#room3mob-checkin').html(value.rooms[2].checkin);
            $('#room3-rate,#room3mob-rate').html(value.rooms[2].rate);
            $('#room3-publishrate,#room3mob-publishrate').html(value.rooms[2].displayrate);


                  
                  //loop
                  var facilities        = value.rooms[2].facilities,
                      compliments  = value.rooms[2].compliments;
                  var output ="",outputcom ="";
                       var i;
                        for (i = 0; i < facilities.length; i++) { 
                          output += facilities[i] + ", ";
                        }

                        var j;
                        for (j = 0; j < compliments.length; j++) { 
                          outputcom += compliments[j] + ", ";
                        }
                  
                  //console.log(output);
                  //output = output.replace("undefined,", "");
                  $('#room3-extracompliments,#room3mob-extracompliments').html(outputcom);
                  $('#room3-facilities,#room3mob-facilities').html(output);
                  $('#room3-compliments,#room3mob-compliments').html(value.rooms[1].compliments);

                  

           
        }); //end each
       
    });
        //alert(winwidth);

        // $('.scroll-hor-item-parts').draggable();
        // $(".scroll-hor-item-parts").swipe({
        //     //Generic swipe handler for all directions
        //     swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
        //       $(this).text("You swiped " + direction ); 
        //     },
        //     //Default is 75px, set to 0 for demo so any distance triggers swipe
        //      threshold:0
        //   });

        var initDate = moment().format('ddd, D MMM YYYY');
        var initNextDate = moment().add(1, 'days').format('ddd, D MMM YYYY');

        $('#checkin,#checkinsuperior,#checkindeluxe,#checkinfamily').val(initDate);
        $('#checkin-day').val(initDate);
        $('#checkout-day').val(initNextDate);
        $('#checkout-date').val(initNextDate);
        $('#checkin-rsvp').text(initDate);
        $('#checkout-rsvp').text(initNextDate);

        $('#checkout-date').click(function(e) {
            e.preventDefault();
            $('#checkin').data('dateRangePicker').open();
        });

        $('#checkin').keypress(function(e) {

            return false
        });

        $('#checkin').dateRangePicker(
          {
              
              showShortcuts: false,
              showTopbar: false,
              startDate: new Date(),
              selectForward: true,
              autoClose: true,
              singleDate : false,
              singleMonth: false,
              format: 'ddd, D MMM YYYY',
              separator: '     to ',
              stickyMonths: true,
              getValue: function()
              {
                if ($('#checkin').val() && $('#checkout-date').val())
                  return $('#checkin').val() + '     to ' + $('#checkout-date').val();
                else
                  return '';
              },
              setValue: function(s,s1,s2)
              {
                $('#checkin').val(s1);
                $('#checkout-date').val(s2);
              }
              
            }
        ).bind('datepicker-first-date-selected', function(event, obj)
          {
            /* This event will be triggered when first date is selected */
            //console.log(obj);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date)
            // }
          }).bind('datepicker-change',function(event,obj)
          {
            var monthdin = din.getMonth();
            var dayin = din.getDay();
            dayin = moment(din).format('ddd, D MMM YYYY');

            var month = dout.getMonth();
            var day = dout.getDay();
            dout = moment(dout).format('ddd, D MMM YYYY');


            $('#checkout-date').val(dout);
            // $('input[name="checkin-date"]').val(dayin);
            // console.log(dayin);

            //throw to modal
            $('#checkin-rsvp').text(dayin);
            $('#checkout-rsvp').text(dout);

            $('#checkin-day').val(din);
            $('#checkout-day').val(dout);
            /* This event will be triggered when second date is selected */
            //var checkoutdate = obj.date2;
            //console.log(obj.date1.getDate());
            // var startDate = obj.date1.getDate();
            // var endDate = obj.date2.getDate();
            var startDate = obj.date1;
            var endDate = obj.date2;
            var days = calcDaysBetween(startDate, endDate);
            //console.log(days);

            var duration= days;
                //duration = duration -1;
                if(duration == 1){
                  duration = duration +' night';
                }else if(duration == -1){
                  duration = '';
                }else{
                  duration = duration +' nights';
                }
                //console.log(duration);
                //$('#duration').val(duration);
                $('#duration-info').text('Duration: '+duration);
                $('#duration-day').val(duration);
                $('#duration-daynum').val(days);

            function parseDate(s){
                var parts = s.split('/');
                return new Date(parts[2], parts[0]-1, parts[1]);
            }
                
            function calcDaysBetween(startDate, endDate){
                return (endDate-startDate)/(1000*60*60*24);
                //return endDate-startDate;
            }

            $('#book-now').prop("disabled", false);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date),
            //    date2: (Date object of the later date),
            //    value: "2013-06-05 to 2013-06-07"
            // }

            //when user didn't select room type and guest numbers
            var roomtype ='Superior';
            //console.log(days);

            //get room price
            $.getJSON( "assets/jsons/rooms.json", function( data ) {
                $.each(data,function(index, value){
                  //console.log(value.rooms[0].truerate);
                  //console.log(value.rooms[1].truerate);
                  switch(roomtype){
                    case 'Superior':
                        $('#rates').val(calcRates(days,value.rooms[0].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[0].truerate));
                    break;
                    case 'Deluxe':
                        $('#rates').val(calcRates(days,value.rooms[1].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[1].truerate));
                    break;
                    case 'Family':
                        $('#rates').val(calcRates(days,value.rooms[2].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[2].truerate));
                    break;
                  }
                });

            });
                  
                  function calcRates(duration, price){
                      return duration*price;
                  }
          });

        $('#checkinsuperior').dateRangePicker(
          {
              
              container:('.check-sel-superior'),
              showShortcuts: false,
              showTopbar: false,
              startDate: new Date(),
              selectForward: true,
              autoClose: true,
              singleDate : false,
              singleMonth: false,
              format: 'ddd, D MMM YYYY',
              separator: '     to ',
              stickyMonths: true,
              getValue: function()
              {
                return $(this).val();
              }
              
            }
        ).bind('datepicker-first-date-selected', function(event, obj)
          {
            /* This event will be triggered when first date is selected */
            //console.log(obj);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date)
            // }
          }).bind('datepicker-change',function(event,obj)
          {
            var dout = moment(obj.date2).format('ddd, D MMM YYYY');
            var din = moment(obj.date1).format('ddd, D MMM YYYY');

            $('#superior #checkout-date').val(dout);

            //throw to modal
            $('#checkin-rsvp').text(din);
            $('#checkout-rsvp').text(dout);

            $('#checkin-day').val(din);
            $('#checkout-day').val(dout);
            /* This event will be triggered when second date is selected */
            //var checkoutdate = obj.date2;
            //console.log(obj.date1.getDate());
            // var startDate = obj.date1.getDate();
            // var endDate = obj.date2.getDate();
            var startDate = obj.date1;
            var endDate = obj.date2;
            var days = calcDaysBetween(startDate, endDate);
            //console.log(days);

            var duration= days;
                //duration = duration -1;
                if(duration == 1){
                  duration = duration +' night';
                }else if(duration == -1){
                  duration = '';
                }else{
                  duration = duration +' nights';
                }
                //console.log(duration);
               // $('#duration').val(duration);
                $('#duration-info').text('Duration: '+duration);
                $('#duration-day').val(duration);
                $('#duration-daynum').val(days);

            function parseDate(s){
                var parts = s.split('/');
                return new Date(parts[2], parts[0]-1, parts[1]);
            }
                
            function calcDaysBetween(startDate, endDate){
                return (endDate-startDate)/(1000*60*60*24);
                //return endDate-startDate;
            }

            $('#book-now').prop("disabled", false);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date),
            //    date2: (Date object of the later date),
            //    value: "2013-06-05 to 2013-06-07"
            // }

            //when user didn't select room type and guest numbers
            var roomtype ='Superior';
            $('#room-rsvp').text(roomtype);
            //console.log(days);

                  //get room price
                  $.getJSON( "assets/jsons/rooms.json", function( data ) {
                      $.each(data,function(index, value){
                        //console.log(value.rooms[0].truerate);
                        //console.log(value.rooms[1].truerate);
                        switch(roomtype){
                          case 'Superior':
                              $('#rates').val(calcRates(days,value.rooms[0].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[0].truerate));
                          break;
                          case 'Deluxe':
                              $('#rates').val(calcRates(days,value.rooms[1].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[1].truerate));
                          break;
                          case 'Family':
                              $('#rates').val(calcRates(days,value.rooms[2].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[2].truerate));
                          break;
                        }
                      });

                  });
                  function calcRates(duration, price){
                      return duration*price;
                  }
          });

        $('#checkindeluxe').dateRangePicker(
          {
              
              container:('.check-sel-deluxe'),
              showShortcuts: false,
              showTopbar: false,
              startDate: new Date(),
              selectForward: true,
              autoClose: true,
              singleDate : false,
              singleMonth: false,
              format: 'ddd, D MMM Y',
              separator: '     to ',
              stickyMonths: true,
              getValue: function()
              {
                return $(this).val();
              }
              
            }
        ).bind('datepicker-first-date-selected', function(event, obj)
          {
            /* This event will be triggered when first date is selected */
            //console.log(obj);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date)
            // }
          }).bind('datepicker-change',function(event,obj)
          {
            var dout = moment(obj.date2).format('ddd, D MMM YYYY');
            var din = moment(obj.date1).format('ddd, D MMM YYYY');

            $('#deluxe #checkout-date').val(dout);

            //throw to modal
            $('#checkin-rsvp').text(din);
            $('#checkout-rsvp').text(dout);

            $('#checkin-day').val(din);
            $('#checkout-day').val(dout);
            /* This event will be triggered when second date is selected */
            //var checkoutdate = obj.date2;
            //console.log(obj.date1.getDate());
            // var startDate = obj.date1.getDate();
            // var endDate = obj.date2.getDate();
            var startDate = obj.date1;
            var endDate = obj.date2;
            var days = calcDaysBetween(startDate, endDate);
            //console.log(days);

            var duration= days;
                //duration = duration -1;
                if(duration == 1){
                  duration = duration +' night';
                }else if(duration == -1){
                  duration = '';
                }else{
                  duration = duration +' nights';
                }
                //console.log(duration);
                //$('#duration').val(duration);
                $('#duration-info').text('Duration: '+duration);
                $('#duration-day').val(duration);
                $('#duration-daynum').val(days);

            function parseDate(s){
                var parts = s.split('/');
                return new Date(parts[2], parts[0]-1, parts[1]);
            }
                
            function calcDaysBetween(startDate, endDate){
                return (endDate-startDate)/(1000*60*60*24);
                //return endDate-startDate;
            }

            $('#book-now').prop("disabled", false);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date),
            //    date2: (Date object of the later date),
            //    value: "2013-06-05 to 2013-06-07"
            // }

            //when user didn't select room type and guest numbers
            var roomtype ='Deluxe';
            $('#room-rsvp').text(roomtype);
            //console.log(days);

                  //get room price
                  $.getJSON( "assets/jsons/rooms.json", function( data ) {
                      $.each(data,function(index, value){
                        //console.log(value.rooms[0].truerate);
                        //console.log(value.rooms[1].truerate);
                        switch(roomtype){
                          case 'Superior':
                              $('#rates').val(calcRates(days,value.rooms[0].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[0].truerate));
                          break;
                          case 'Deluxe':
                              $('#rates').val(calcRates(days,value.rooms[1].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[1].truerate));
                          break;
                          case 'Family':
                              $('#rates').val(calcRates(days,value.rooms[2].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[2].truerate));
                          break;
                        }
                      });

                  });
                  function calcRates(duration, price){
                      return duration*price;
                  }
          });


        $('#checkinfamily').dateRangePicker(
          {
              container:('.check-sel-family'),
              showShortcuts: false,
              showTopbar: false,
              startDate: new Date(),
              selectForward: true,
              autoClose: true,
              singleDate : false,
              singleMonth: false,
              format: 'ddd, D MMM YYYY',
              separator: '     to ',
              stickyMonths: true,
              getValue: function()
              {
                return $(this).val();
              }
              
            }
        ).bind('datepicker-first-date-selected', function(event, obj)
          {
            /* This event will be triggered when first date is selected */
            //console.log(obj);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date)
            // }
          }).bind('datepicker-change',function(event,obj)
          {
            var dout = moment(obj.date2).format('ddd, D MMM YYYY');
            var din = moment(obj.date1).format('ddd, D MMM YYYY');

            $('#family #checkout-date').val(dout);

            //throw to modal
            $('#checkin-rsvp').text(din);
            $('#checkout-rsvp').text(dout);

            $('#checkin-day').val(din);
            $('#checkout-day').val(dout);
            /* This event will be triggered when second date is selected */
            //var checkoutdate = obj.date2;
            //console.log(obj.date1.getDate());
            // var startDate = obj.date1.getDate();
            // var endDate = obj.date2.getDate();
            var startDate = obj.date1;
            var endDate = obj.date2;
            var days = calcDaysBetween(startDate, endDate);
            //console.log(days);

            var duration= days;
                //duration = duration -1;
                if(duration == 1){
                  duration = duration +' night';
                }else if(duration == -1){
                  duration = '';
                }else{
                  duration = duration +' nights';
                }
                //console.log(duration);
                //$('#duration').val(duration);
                $('#duration-info').text('Duration: '+duration);
                $('#duration-day').val(duration);
                $('#duration-daynum').val(days);

            function parseDate(s){
                var parts = s.split('/');
                return new Date(parts[2], parts[0]-1, parts[1]);
            }
                
            function calcDaysBetween(startDate, endDate){
                return (endDate-startDate)/(1000*60*60*24);
                //return endDate-startDate;
            }

            $('#book-now').prop("disabled", false);
            // obj will be something like this:
            // {
            //    date1: (Date object of the earlier date),
            //    date2: (Date object of the later date),
            //    value: "2013-06-05 to 2013-06-07"
            // }

            //when user didn't select room type and guest numbers
            var roomtype ='Family';
            $('#room-rsvp').text(roomtype);
            //console.log(days);

                  //get room price
                  $.getJSON( "assets/jsons/rooms.json", function( data ) {
                      $.each(data,function(index, value){
                        //console.log(value.rooms[0].truerate);
                        //console.log(value.rooms[1].truerate);
                        switch(roomtype){
                          case 'Superior':
                              $('#rates').val(calcRates(days,value.rooms[0].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[0].truerate));
                          break;
                          case 'Deluxe':
                              $('#rates').val(calcRates(days,value.rooms[1].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[1].truerate));
                          break;
                          case 'Family':
                              $('#rates').val(calcRates(days,value.rooms[2].truerate));
                              $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[2].truerate));
                          break;
                        }
                      });

                  });
                  function calcRates(duration, price){
                      return duration*price;
                  }
          });






          $('.btn-number').click(function(e){
              e.preventDefault();
              
              fieldName = $(this).attr('data-field');
              type      = $(this).attr('data-type');
              var input = $("input[name='"+fieldName+"']");
              console.log(input);
              var currentVal = parseInt(input.val());
              if (!isNaN(currentVal)) {
                  if(type == 'minus') {
                      
                      if(currentVal > input.attr('min')) {
                          input.val(currentVal - 1).change();
                      } 
                      switch(parseInt(input.val())){
                        case 3:
                          $('#room-jum').val('1');
                        break;
                        case 6:
                          $('#room-jum').val('2');
                        break;
                        case 9:
                          $('#room-jum').val('3');
                        break;
                      }
                      if(parseInt(input.val()) == input.attr('min')) {
                          $(this).attr('disabled', true);
                      }

                  } else if(type == 'plus') {

                      if(currentVal < input.attr('max')) {
                          input.val(currentVal + 1).change();
                      }
                      switch(parseInt(input.val())){
                        case 4:
                          $('#room-jum').val('2');
                        break;
                        case 7:
                          $('#room-jum').val('3');
                        break;
                        case 10:
                          $('#room-jum').val('4');
                        break;
                      }
                      
                      if(parseInt(input.val()) == input.attr('max')) {
                          $(this).attr('disabled', true);
                          
                      }

                  }
              } else {
                  input.val(0);
              }
          });
          $('.input-number').focusin(function(){
             $(this).data('oldValue', $(this).val());
          });
          $('.input-number').change(function() {
              
              minValue =  parseInt($(this).attr('min'));
              maxValue =  parseInt($(this).attr('max'));
              valueCurrent = parseInt($(this).val());
              
              name = $(this).attr('name');
              if(valueCurrent >= minValue) {
                  $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
              } else {
                  alert('Sorry, the minimum value was reached');
                  $(this).val($(this).data('oldValue'));
              }
              if(valueCurrent <= maxValue) {
                  $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
              } else {
                  alert('Sorry, the maximum value was reached');
                  $(this).val($(this).data('oldValue'));
              }
              
              
          });
          $(".input-number").keydown(function (e) {
                  // Allow: backspace, delete, tab, escape, enter and .
                  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                       // Allow: Ctrl+A
                      (e.keyCode == 65 && e.ctrlKey === true) || 
                       // Allow: home, end, left, right
                      (e.keyCode >= 35 && e.keyCode <= 39)) {
                           // let it happen, don't do anything
                           return;
                  }
                  // Ensure that it is a number and stop the keypress
                  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                      e.preventDefault();
                  }
          });

          $('#guest').click(function(){
              
              $("#gnr").slideDown(500,function(){
                 $(this).prop("disabled", true);
                 $(this).css('opacity',1);
              });
              // $(".guestandroom").show("slide", { duration: 1500, easing: 'easeOutBack'}).hide(); 
              // $(".guestandroom").fadeIn(1500).dequeue(); 
          });
          $(document).mouseup(function (e)
                    {
            var container = $("#gnr"); // YOUR CONTAINER SELECTOR

            if (!container.is(e.target) // if the target of the click isn't the container...
                && container.has(e.target).length === 0) // ... nor a descendant of the container
            {
              container.slideUp(400,function(){

                 $(this).css('opacity',0);
                 $('#guest').prop("disabled", false);
              });
            }
          });

          $('#close-room').click(function(){
            $("#gnr").slideUp(500,function(){
                 $(this).css('opacity',0);
              });
          });

          $( "#guest-jum" ).change(function() {
            // Check input( $( this ).val() ) for validity here
            //console.log($( this ).val() );
            var guestjum = $(this).val(),
                roomjum  = $('#room-jum').val()

              guestandroom = guestjum+' guest(s),'+' '+roomjum+' room(s)';
              $('#guest').val(guestandroom);
               //throw to modal
              $('#guestroom-rsvp').text(guestandroom);
              $('#guest-room').val(guestandroom);
              //activate book button
              console.log(guestjum);
              if(guestjum === 3){
                $('.right-btn .btn-number').attr('disabled',true);
              }
              //$('#book-now').prop("disabled", false);
          });

          $( "#room-jum" ).change(function() {
            // Check input( $( this ).val() ) for validity here
            //console.log($( this ).val() );
            var roomjum = $(this).val(),
              guestjum = $('#guest-jum').val(),

              guestandroom = guestjum+' guest(s),'+' '+roomjum+' room(s)';
              $('#guest').val(guestandroom);
              //throw to modal
              $('#guestroom-rsvp').text(guestandroom);
              $('#guest-room').val(guestandroom);
              //activate book button
              //$('#book-now').prop("disabled", false);
          });

          $('#room-type').change(function(){
              var roomtype = $(this).val(),
                  days = $("#duration-daynum").val();
              $('#room-rsvp').text(roomtype);
              $('#rooms-type').val(roomtype);
              console.log(roomtype);

              //get room price
            $.getJSON( "assets/jsons/rooms.json", function( data ) {
                $.each(data,function(index, value){
                  //console.log(value.rooms[0].truerate);
                  //console.log(value.rooms[1].truerate);
                  switch(roomtype){
                    case 'Superior':
                        $('#rates').val(calcRates(days,value.rooms[0].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[0].truerate));
                    break;
                    case 'Deluxe':
                        $('#rates').val(calcRates(days,value.rooms[1].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[1].truerate));
                    break;
                    case 'Family':
                        $('#rates').val(calcRates(days,value.rooms[2].truerate));
                        $('#price-rsvp').text('Rp '+calcRates(days,value.rooms[2].truerate));
                    break;
                  }
                });

            });
              function calcRates(duration, price){
                  return duration*price;
              }

          });


          $("#confirmation-form").validate({
              // Specify validation rules
              rules: {
                // The key name on the left side is the name attribute
                // of an input field. Validation rules are defined
                // on the right side
                checkinname: "required",
                checkinmobile: {
                  required: true,
                  number : true
                },
                checkinemail: {
                  required: true,
                  // Specify that email should be validated
                  // by the built-in "email" rule
                  email: true
                },
                checkinrandid:"required"
              },
              // Specify validation error messages
              messages: {
                checkinname: "Please enter your name",
                checkinmobile: "Please enter your mobile number",
                email: "Please enter a valid email address"
              },
              // Make sure the form is submitted to the destination defined
              // in the "action" attribute of the form when valid
              submitHandler: function(form) {
                //form.submit();
                // show that something is loading
                    $('#response').html("<b>Loading response...</b>");

                    // Call ajax for pass data to other place
                    $.ajax({
                    type: 'POST',
                    url: 'confirm.php',
                    data: $(form).serialize() // getting filed value in serialize form
                    })
                    .done(function(data){ // if getting done then call.

                    // show the response
                    if(data ==='fail'){
                      data = 'Booking failed';
                    }else{
                      data = 'Booking sent';
                    }
                    $('#response').html(data);
                    $('.reserv-fields').fadeOut('fast');
                    $('.reserv-succeed').fadeIn('slow');
                    setTimeout(function() {
                        $('#confirmModal').modal('hide');
                    },5000);
                    

                    })
                    .fail(function() { // if fail then getting message

                    // just in case posting your form failed
                    //alert( "Booking failed." );
                    $('#response').html('Booking failed...');

                    });

                    // to prevent refreshing the whole page page
                    return false;

              }
            });

            $('#closethis-superior,#closethis-deluxe,#closethis-family').click(function(){
              
              var dataRoom = $(this).attr('data-room');
                $('#mobile-room').fadeOut('fast');
                $('#desktop-main').fadeIn('fast');
                $('#'+dataRoom).fadeOut('fast');
            });

            $('#get-room-detail1,#get-room-detail2,#get-room-detail3').click(function(){
              
              var dataRoom = $(this).attr('data-room');
              //console.log(dataRoom);
              $('#desktop-main').fadeOut('fast');
              $('#'+dataRoom).fadeIn('fast');
              $('#mobile-room').fadeIn('fast');
            });


            $("#food-slider").lightSlider({
                loop:true,
                item:4,
                keyPress:true
            });
            $("#review-slider").lightSlider({
                loop:true,
                item:2,
                keyPress:true
            });
            $("#review-slider-mobile").lightSlider({
                loop:true,
                item:1,
                keyPress:true
            });
            $(".elfsight-app-857f551c-9cfc-455c-87f8-b93159f21966 .eapps-link").hide();

            //$('.date-picker-wrapper:nth-child(1)').css({'bottom':'62px!important'});