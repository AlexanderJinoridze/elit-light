import 'jquery-validation';

(function ( $ ) {
    var serialize = function(formInputs) {
        var formData = [];
    
        formInputs.each(function(){
            formData.push($(this).attr('name')+'='+$(this).val());
        });
        
        return formData.join('&');
    };
    
    var disable = function(formInputs,disabled) {
        var disabled = disabled || false;
    
        formInputs.each(function(){
            if(disabled) {
                $(this).attr('disabled','disabled');
            } else {
                $(this).removeAttr('disabled');
            }
        });
    };
    
    var clear = function(formInputs) {
        formInputs.each(function(){
            $(this).val('').removeClass('success with_content');
        });
    };


    $.fn.asynForm = function(rules,messages,responseMessages) {
        var responseMessages = responseMessages,
            responseLabel = function(response){
                this.find('.response_label').remove();
                $("<label></label>")
                    .addClass('response_label '+response+'_label')
                    .text(responseMessages[response])
                    .prependTo(this[0])
                    .delay(2000)
                    .fadeOut(800);
            };

        return this.each(function() {
            $(this).validate({
                rules: rules,
                messages: messages,
                submitHandler: function(form) {
                    var form = $(form),
                        formInputs = form.find(':input').not('button[type="submit"]');
            
                    disable(formInputs,true);
                    form.addClass('processing');
            
                    $.ajax({
                        type: form.attr('method'),
                        url: form.attr('action'),
                        data: serialize(formInputs),
                        timeout: 30000,
                        complete: function (jqXHR, textStatus) {
                            disable(formInputs);
                            form.removeClass('processing');
                        },
                        success: function(data){
                            clear(formInputs);
                            responseLabel.apply(form,['load']);
                        },
                        error: function(jqXHR, textStatus){
                            if (textStatus === 'timeout') {
                                responseLabel.apply(form,['timeout']);
                            } else {
                                clear(formInputs);
                                responseLabel.apply(form,['error']);
                            }
                        }
                    });
                }
            });
        });
    }

}(jQuery));