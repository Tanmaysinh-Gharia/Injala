var page_headings = {
    'page1': "📌 Personal Details",
    'page2': "📌 Employment Details",
    'page3': "📌 Interstate Registration Details",
    'page4': "📌 Board Use Only",
}
var req_fields = {
    'page1': ['firstname', 'lastname', 'email', 'mobno'],
    'page2': ['occu', 'role', 'emplr_name', 'emplr_mobno', 'emplr_strt_date'],
    'page3': ['registered'],
    'page4': ['emplr_reg_no', 'empl_reg_no', 'approved', 'signed']
}

$(document).ready(function () {
    // Your jQuery code here
    console.log('Document is ready');
    // function load_data(this) {
    //     const data = JSON.parse(localStorage.getItem());
    //     if(data)
    //     {

    //     }

    // }
    Object.keys(req_fields).forEach(pageId => {
        req_fields[pageId].forEach(field => {
            $(`#${field}`).on('blur', function () {
                validateField(field, $(this).attr('id'), pageId);
            });
        });
    });

    $('form').on('submit', function (event) {
        let isValid = true;

        Object.keys(req_fields).forEach(pageId => {
            req_fields[pageId].forEach(field => {
                const fieldId = field;
                const value = $(`#${fieldId}`).val();
                if (!value) {
                    validateField(field, fieldId, pageId);
                    isValid = false;
                }
            });
        });

        if (!isValid) {
            event.preventDefault(); // Prevent form submission if validation fails
            alert('Please fill out all required fields correctly.');
        }
    });
    var formvalidation = {
        form1: {

        },
        form2: {
            role: $('input[name="role"]').change(function () {
                if ($(this).is(':checked')) {
                    localStorage.setItem('role'); // Display selected option
                }
            }),
        },
        form3: {
            interstate:
                
                    $('input[name="inter"]').change(function () {
                        if ($('#yes').is(':checked')) {
                            $('#additionalFields').slideDown();
                            $('#additionalFields').css('visibility','visible');
                             // Show the fields with animation
                        } else {
                            $('#additionalFields').slideUp(); // Hide the fields with animation
                        }
                    }),
                
        },
        form4: {}
    };
    
    
    $('.page_nav').click(function () {
        let called_id = $(this).attr('id');
        let remove_pages = Object.keys(req_fields);
        const index = remove_pages.indexOf(called_id);
        if (index > -1)
            remove_pages.splice(index, 1);
        remove_pages.forEach(rm => {
            $('.' + rm).fadeOut(10);
            percent = calculate_percentage(rm);
            showpercent(percent, rm);
        });
        $('.' + called_id).fadeIn('slow');
        if ($('#yes').is(':checked')) {
            $('#additionalFields').slideDown(1);
            $('#additionalFields').css('visibility','visible');
             // Show the fields with animation
        } else {
            $('#additionalFields').slideUp(1); // Hide the fields with animation
        }
        percent = calculate_percentage(called_id);
        showpercent(percent, called_id);
        $('.page_heading').text(page_headings[called_id]);


    });
    // #COMMON
        function validateField(field, fieldId, pageId) {
    const $field = $(`#${fieldId}`);
    const value = $field.val();
    let errorMessage = '';

    // Validation for empty field
    if (value.trim() === "") {
        $field.css("border", "2px solid red");
        const messageDivId = `${fieldId}-message`;
        if (!$(`#${messageDivId}`).length) {
            $field.after(`
                <div id="${messageDivId}" 
                     class="text-danger error-message">This is a required field.</div>
            `);
        }
        $(`#${messageDivId}`).fadeIn(); // Show message
        setTimeout(() => $(`#${messageDivId}`).fadeOut(), 5000);
        return false;
    }

    // Validation logic for specific fields
    switch (field) {
        case 'email':
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) errorMessage = 'Invalid email format (example@example.com).';
            break;
        case 'mobile':
            if (!/^\d{10}$/.test(value)) errorMessage = 'Mobile number must be 10 digits.';
            break;
        case 'empr_pin':
        case 'emplr_reg_no':
        case 'empl_reg_no':
            if (!/^\d{6}$/.test(value)) errorMessage = 'Pincode/Registration number must be 6 digits.';
            break;
        default:
            if (!value) errorMessage = `${field.replaceAll('_', ' ')} is required.`;
    }

    // Display or remove error messages
    const errorDivId = `${fieldId}-error`;
    if (errorMessage) {
        if (!$(`#${errorDivId}`).length) {
            $field.after(`
                <div id="${errorDivId}" 
                     class="text-danger error-message">${errorMessage}</div>
            `);
        } else {
            $(`#${errorDivId}`).text(errorMessage);
        }
        $(`#${errorDivId}`).fadeIn();
        $field.css("border", "2px solid red");
    } else {
        $(`#${errorDivId}`).fadeOut(() => $(`#${errorDivId}`).remove());
        $field.css("border", "");
    }
}

    
    function calculate_percentage(id) {
        fields = req_fields[id];
        ttl = Object.keys(fields).length;
        let cnt = 0;
        fields.forEach(field => {
            if (localStorage.getItem(field) != null)
                cnt++;
        });
        console.log(cnt);
        per = cnt / ttl * 100;
        console.log(per);
        return per;
    }
    function showpercent(percent, id) {
        const circle = $('#' + id).find('svg').find('.progress');
        // const circle = document.querySelector('.progress');
        console.log(circle);
        console.log(percent);
        const radius = 30;
        const circumference = 2 * Math.PI * radius;

        circle.attr('strokeDasharray', circumference);
        circle.attr('strokeDashoffset', (circumference - (percent / 100) * circumference));

        // Update the text inside the circle
        $('#' + id).find('.percent').text(`${percent}%`);
    }

    $('.sidebar').mouseenter(function () {
        $(this).animate({ width: '300px' }, 400);
        $('.main').animate({ 'margin-left': '310px' }, 400);
        $('.sidebar_heading').css('font-size', '25px');
        $('.titles').css('visibility', 'visible');
    });
    $('.sidebar').mouseleave(function () {
        $(this).animate({ width: '115px' }, 400);

        $('.sidebar_heading').css('font-size', '16px');
        $('.main').animate({ 'margin-left': '140px' }, 400);
        $('.titles').css('visibility', 'hidden');
    });
    $('.form-control').blur(function () {
        item_id = $(this).attr('id');
        val = $(this).val();
        if (val != null && val != '')
            localStorage.setItem(item_id, val);
    });
});