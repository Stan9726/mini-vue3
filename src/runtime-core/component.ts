// 用于创建组件实例对象
export function createComponentInstance(vnode) {
	const component = {
		vnode,
		type: vnode.type
	}

	return component
}

// 用于初始化 props、初始化 slots 和调用 setup 方法以及设置 render 函数
export function setupComponent(instance) {
	// TODO: 调用 initProps
	// TODO: 调用 initSlots

	setupStatefulComponent(instance)
}

/**
 * 用于初始化有状态的组件（相对的是没有状态的函数式组件）
 * 调用 setup 方法并处理其返回值
 */
function setupStatefulComponent(instance: any) {
	// 通过组件实例对象的 type 属性获取组件选项对象
	const Component = instance.type

	// 通过解构赋值获取组件选项对象中的 setup 方法
	const { setup } = Component

	// 若组件选项对象中包含 setup 方法则调用该方法并处理其返回值
	if (setup) {
		// 调用 setup 方法并获取其返回值
		const setupResult = setup()

		// 处理 setup 方法的返回值
		handleSetupResult(instance, setupResult)
	}
}

// 用于处理 setup 方法的返回值
function handleSetupResult(instance, setupResult) {
	// 根据 setup 方法返回值类型的不同进行不同的处理
	// 若返回一个 object 则将其注入到组件的上下文中
	if (typeof setupResult === 'object') {
		instance.setupState = setupResult
	}
	// 若返回一个 function 则将其作为组件的 render 函数
	else if (typeof setupResult === 'function') {
		// TODO: 处理 function
	}

	finishComponentSetup(instance)
}

// 用于设置 render 函数
function finishComponentSetup(instance: any) {
	// 通过组件实例对象的 type 属性获取组件选项对象
	const Component = instance.type

	// 若组件选项对象中包含 render 函数则将其赋值给组件实例对象的 render 方法
	if (Component.render) {
		instance.render = Component.render
	}
}