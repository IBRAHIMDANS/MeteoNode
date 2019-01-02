/**
 * Created by clementhoubre on 27/07/2016.
 */
YUI.add("adnPopup", function(Y){

	/* ADNPopup class constructor */
	function ADNPopup(config) {
		ADNPopup.superclass.constructor.apply(this, arguments);
	}

	ADNPopup.NAME = "adnPopup";

	ADNPopup.TEMPLATE = '<div class="spopup"><div class="spopup-header">{title}</div><div class="spopup-content">{message}</div><div class="spopup-footer">{buttons}</div></div>';

	ADNPopup.ATTRS = {
		title: {
			value: "Anime Digital Network"
		},
		message: {
			value: null
		},
		buttonOK: {
			value: {
				label: null,
				url: null
			}
		},
		buttonCancel: {
			value: {
				label: "Fermer",
				url: null
			}
		},
		show: {
			value: false
		},
		okCallback: {
			value: null
		}
	};

	//noinspection JSUnresolvedVariable
	Y.extend(ADNPopup, Y.Widget, {
		initializer: function() {

		},
		destructor: function() {

		},
		renderUI: function() {
			//var cb = this.get("contentBox");
			this.popupNode = this.createPopup();
			this.backgroundNode = Y.Node.create('<div class="spopup-background"></div>');
			this.set("show", true);
		},
		bindUI: function() {

			this.after("showChange", this.syncUI, this);

			if (this.popupNode == null) {
				return;
			}

			var that = this;
			
			this.popupNode.all("a").on("click", function(e) {
				e.preventDefault();
				var url = e.target.get("href");
				that.set("show", false);
				var callback = that.get("okCallback");
				if (callback != null && e.target.hasClass("spopup-button-ok")) {
					callback();
					return;
				}
				if (url.indexOf("#") == -1) {
					window.location = url;
				}
			});
		},
		syncUI: function() {
			if (this.popupNode != null) {
				if (this.get("show")) {
					Y.one("body").append(this.popupNode);
					Y.one("body").append(this.backgroundNode);
				} else {
					this.popupNode.remove();
					this.backgroundNode.remove();
					this.destroy()
				}
			}
		},
		createPopup: function() {
			var message = this.get("message");
			if (message == null) {
				return null;
			}
			var popupNode = Y.Node.create(Y.Lang.sub(
				ADNPopup.TEMPLATE,
				{
					title: this.get("title"),
					message: this.get("message"),
					buttons: this.createButtons()
				}
			));
			return popupNode;
		},
		createButtons: function() {
			var buttonOK = this.get("buttonOK");
			var buttonCancel = this.get("buttonCancel");
			var html = "";
			if (buttonCancel.label != null) {
				html += '<a href="' + ((buttonCancel.url != null)?buttonCancel.url:'#') + '" class="spopup-button">' + buttonCancel.label + '</a>';
			}
			if (buttonOK.label != null) {
				html += '<a href="' + ((buttonOK.url != null)?buttonOK.url:'#') + '" class="spopup-button spopup-button-ok">' + buttonOK.label + '</a>';
			}
			return html;
		}
	});

	Y.ADNPopup = ADNPopup;

}, "3.8.0", {requires:["widget","node", "event"]});