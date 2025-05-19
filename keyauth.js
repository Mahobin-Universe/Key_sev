import axios from 'axios';
import crypto from 'crypto';

export class KeyAuth {
  constructor(name, ownerid, version) {
    this.name = name;
    this.ownerid = ownerid;
    this.version = version;
    this.sessionid = null;
    this.initialized = false;
    this.apiUrl = 'https://keyauth.win/api/1.3/';
  }

  async init() {
    if (this.initialized) return true;
    this.sessionid = crypto.randomUUID().replace(/-/g, '');

    const res = await this._post({
      type: 'init',
      ver: this.version,
      name: this.name,
      ownerid: this.ownerid,
      sessionid: this.sessionid,
    });

    if (!res.success) throw new Error(`Init failed: ${res.message}`);

    this.initialized = true;
    return true;
  }

  async login(username, pass, twofaCode = null) {
    return await this._withRetry(() =>
      this._post({
        type: 'login',
        username,
        pass,
        '2fa': twofaCode,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async register(username, pass, key, email = '', token = '') {
    return await this._withRetry(() =>
      this._post({
        type: 'register',
        username,
        pass,
        key,
        email,
        token,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async license(key, twofaCode = null) {
    return await this._withRetry(() =>
      this._post({
        type: 'license',
        key,
        '2fa': twofaCode,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async upgrade(username, key) {
    return await this._withRetry(() =>
      this._post({
        type: 'upgrade',
        username,
        key,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async check() {
    return await this._withRetry(() =>
      this._post({
        type: 'check',
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async log(message) {
    return await this._withRetry(() =>
      this._post({
        type: 'log',
        pcuser: process.env.USER || 'server',
        message,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async var(varid) {
    return await this._withRetry(() =>
      this._post({
        type: 'var',
        varid,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async webhook(webid, params = '') {
    return await this._withRetry(() =>
      this._post({
        type: 'webhook',
        webid,
        params,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async file(fileid) {
    return await this._withRetry(() =>
      this._post({
        type: 'file',
        fileid,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async fetchAppSettings() {
    return await this._withRetry(() =>
      this._post({
        type: 'fetchappsettings',
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async getUserData() {
    return await this._withRetry(() =>
      this._post({
        type: 'userdata',
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async ban(reason = '') {
    return await this._withRetry(() =>
      this._post({
        type: 'ban',
        reason,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }
  async enable2FA(secret) {
    return await this._withRetry(() =>
      this._post({
        type: 'enable2fa',
        secret,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }

  async disable2FA(token) {
    return await this._withRetry(() =>
      this._post({
        type: 'disable2fa',
        token,
        name: this.name,
        ownerid: this.ownerid,
        sessionid: this.sessionid,
      })
    );
  }
  
  
  async _withRetry(fn) {
    await this._ensureInit();
    let response = await fn();
    if (!response.success && response.message?.includes('Invalid session')) {
      this.initialized = false;
      await this.init();
      response = await fn();
    }
    return response;
  }

  async _ensureInit() {
    if (!this.initialized) await this.init();
  }

  async _post(data) {
    try {
      const response = await axios.post(this.apiUrl, data);
      return response.data;
    } catch (err) {
      return {
        success: false,
        message: `HTTP Error: ${err.response?.data?.message || err.message}`,
      };
    }
  }
                                 }
                
