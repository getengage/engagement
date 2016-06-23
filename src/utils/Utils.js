class $$ {

  static extend(obj1, obj2) {
    Object.assign(Object.create(Object.prototype), obj1, obj2);
  }

  static getAbsoluteOffsetFromBody(el) {
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
      _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
      _y += el.offsetTop - el.scrollTop + el.clientTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  static getAbsoluteOffsetFromGivenElement(el) {   // finds the offset of el from relativeEl
    let _x = 0;
    let _y = 0;
    while( el && el != relativeEl && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
      _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
      _y += el.offsetTop - el.scrollTop + el.clientTop;
      el = el.offsetParent;
    }
    return { top: _y, left: _x };
  }

  static getAbsoluteOffsetFromRelative(el) {   // finds the offset of el from the first parent with position: relative
    let _x = 0;
    let _y = 0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) )
    {
        _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
        _y += el.offsetTop - el.scrollTop + el.clientTop;
        el = el.offsetParent;
        if (el != null)
        {
            if (getComputedStyle !== 'undefined')
                valString = getComputedStyle(el, null).getPropertyValue('position');
            else
                valString = el.currentStyle['position'];
            if (valString === "relative")
                el = null;
        }
    }
    return { top: _y, left: _x };
  }

}

export default $$;
