$(document).ready(function() {
    $('.next-step_js').click(function() {
        const getStepId = $(this).attr('data-step-id');
        $('.step-wise-form_js').removeClass('active');
        $(getStepId).addClass('active');
        // call this function to show/highlight the progress
        showProgressBar();
    });

    $('.campaign-type_js').change(function(){
        const campaignType = $(this).val();
        if (campaignType === 'email') {
            $('.email-campaigns-additional-form-elements').css('display', 'block');
        } else {
            $('.email-campaigns-additional-form-elements').css('display', 'none');
        }
    })
});

function showProgressBar() {
    $('.steps-progress_js').removeClass('active');
    if ($('#createCampaign').hasClass('active')) {
        $('#steps-progress-1_js').addClass('active');
    } else if ($('#personalizeCampaign').hasClass('active')) {
        $('#steps-progress-1_js, #steps-progress-2_js').addClass('active');
    } else if ($('#selectVideosCategory').hasClass('active')) {
        $('#steps-progress-1_js, #steps-progress-2_js, #steps-progress-3_js').addClass('active');
    }
}