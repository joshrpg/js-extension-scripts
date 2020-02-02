/** Simple Style Tweaks *******************************************************/

// $('.sw-app-region').css('background-color', '#231f20');
// $('.slideshow').css('background-color', '#231f20');
// $('.titleTable').css('background-color', '#231f20');
// $('.titleTable').css('color', '#ccc');
// $('.page-title').css('color', '#ccc');
// $('.sw-hdr-timestamp').css('color', '#ccc');

/** Adva Style Tweaks *********************************************************/
var AlertPanel = $('.ResourceWrapper').toArray();

for (var i = 0; i < AlertPanel.length; i++) {
  if (AlertPanel[i].innerText.includes('Active Alerts on This Node (0)')
      || AlertPanel[i].innerText.includes('Active Application Alerts (0)')) {
    AlertPanel[i].hidden = true;
  }
}

/*** Alert Style Tweaks *******************************************************/

$('.activeAlerts-rowSerious').each( function (i) {
  $(this).css('background-color', 'orange');
  $(this).css('color', '#fff');
  $(this).find('a').each(function (a) {
    $(this).css('color', '#000');
  });
});

$('.activeAlerts-rowError').each( function (i) {
  $(this).css('background-color', 'red');
  $(this).css('color', '#fff');
  $(this).find('a').each(function (a) {
    $(this).css('color', '#000');
  });
});

/*** EOF Tweaks ***************************************************************/

