define([], function () {
  return [
    {
      path: '/',
      component: view('home')
    },
    {
      path: '/stores',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('stores'),
          name: 'storeList'
        },
        {
          path: ':id',
          component: view('store_details'),
          name: 'storeDetails'
        }
      ]
    },
    {
      path: '/promotions',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('promotions'),
          name: 'promoList'
        },
        {
          path: ':id',
          component: view('promotion_details'),
          name: 'promotionDetails'
        }
      ]
    },
    {
      path: '/events',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('events'),
          name: 'eventList'
        },
        {
          path: ':id',
          component: view('event_details'),
          name: 'eventDetails'
        }
      ]
    },
    {
      path: '/jobs',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('jobs'),
          name: 'jobList'
        },
        {
          path: ':id',
          component: view('job_details'),
          name: 'jobDetails'
        }
      ]
    },
    {
      path: '/map',
      component: view('default'),
      redirect: '/404',
      children: [
        {
          path: '',
          component: view('map'),
          name: 'map'
        }
      ]
    },
    {
      path: '/hours',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('hours'),
          name: 'hourList'
        }
      ]
    },
    {
      path: '/contest',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('contest'),
          name: 'contestList'
        }
      ]
    },
    {
      path: '/contact_us',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('contact_us'),
          name: 'contactUs'
        }
      ]
    },
    {
      path: '/newsletter',
      component: view('default'),
      children: [
        {
          path: '',
          component: view('newsletter'),
          name: 'newsletter'
        }
      ]
    },
    {
      path: '/pages',
      component: view('default'),
      redirect: '/404',
      children: [
        {
          path: ':id',
          component: view('page_details'),
          name: 'pageDetails'
        }
      ]
    },
    {
      path: '/find_us',
      component: view('default'),
      redirect: '/404',
      children: [
        {
          path: '',
          component: view('find_us'),
          name: 'findUs'
        }
      ]
    },
    {
      path: '/community',
      component: view('default'),
      redirect: '/404',
      children: [
        {
          path: '',
          component: view('community'),
          name: 'community'
        }
      ]
    },
    {
      path: '/photos',
      component: view('default'),
      redirect: '/404',
      children: [
        {
          path: '',
          component: view('photos'),
          name: 'community'
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      component: view('notfoundcomponent')
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]

  /**
   * Asynchronously load view (lazy-loading)
   * @param {string} name the filename (basename) of the view to load.
   */
  function view(name) {
    return function(resolve) {
      require(['vue!' + name + '.vue'], resolve);
    }
  };
});
