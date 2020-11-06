export default function paramsBuilder(connName, spName) {
  this.ConnName = connName;
  this.SPName = spName;
  this.Params = [];

  this.AddParam = function (param) {
    if (!param.hasOwnProperty('Name') || !param.hasOwnProperty('Value') || !param.hasOwnProperty('DBType')) {
      throw new Error('Parameter Required Arg Error');
    }

    this.Params.push(param);
  };

  this.PrepareParam = function () {
    if (!this.SPName || this.SPName.length < 1) {
      throw new Error('SPName: Procedure Name is Required');
    }
    if (!this.ConnName || this.ConnName.length < 1) {
      throw new Error('ConnName: DBConnection Name is Required');
    }

    let objParam = {
      SPName: this.SPName,
      SQLParams: this.Params
    };
    return {
      connectionName: this.ConnName,
      param: encodeURIComponent(JSON.stringify(objParam))
    };
  };

  this.PrepareparamObj = function () {
    if (!this.SPName || this.SPName.length < 1) {
      throw 'SPName: Procedure Name is Required';
    }
    if (!this.ConnName || this.ConnName.length < 1) {
      throw 'ConnName: DBConnection Name is Required';
    }

    let objParam = {
      SPName: this.SPName,
      SQLParams: this.Params
    };

    return objParam;
  };
}
