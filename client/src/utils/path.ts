// if routes are to be changed in future
// using this will save a lot of time in future

//  <Link  href = {paths.register} />
// or
//  <Link  href = {paths.category('id-999')} />

const paths = {
  home: '',
  signup: 'signup',
  signin: 'signin',
  products: 'products',

  myAds(id: string | null) {
    if (id) {
      return `/myAds#${id}`;
    }
    return '/myAds';
  },
};

export default paths;
