/// <reference path="../util/util.ts" />

module drunk.observable {
	export var ObservableObjectPrototype = {};
	
	/**
	 * 设置对象的属性，并发送更新的消息
	 */
	export function setProperty(data: ObservableObject, key: string, value: any): void {
		if (data.hasOwnProperty(key)) {
			data[key] = value;
			return;
		}
		
		observable.convert(data, key, value);
		observable.notify(data);
	}
	
	/**
	 * 移除对象属性，并会发送更新的消息
	 */
	export function removeProperty(data: ObservableObject, key: string): void {
		if (!data.hasOwnProperty(key)) {
			return;
		}
		
		delete data[key];
		observable.notify(data);
	}
	
	util.defineProperty(ObservableObjectPrototype, "setProperty", function setObservableObjectProperty(key: string, value: any) {
		setProperty(this, key, value);
	});
	
	util.defineProperty(ObservableObjectPrototype, "removeProperty", function removeObservableObjectProperty(key: string) {
		removeProperty(this, key);
	});
}