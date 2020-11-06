<template>
    <transition name="dialog-fade"
            @after-leave="afterLeave">
        <div class="el-dialog__wrapper"
             v-show="visible"
             @click.self="handleWrapperClick">
            <div class="dialog-draggable-wrap" :style="wrapStyle" :class="[{ 'is-fullscreen': defaultFullScreen}]">
                <div class="el-dialog"
                     :class="[{ 'is-fullscreen': defaultFullScreen, 'el-dialog--center': center }, customClass]"
                     ref="dialog"
                     :style="dialogStyle">
                    <div class="el-dialog__header is-base-dialog">
                        <div class="el-dialog__header-inner"
                             :class="{dragging: draggable && dragData.dragging}"
                             @mousedown="handleMoveStart">
                            <slot name="title">
                                <span class="el-dialog__title">{{ title }}</span>
                            </slot>
                        </div>
                        <button type="button"
                                class="el-dialog__headerbtn el-dialog__fullscreenbtn"
                                aria-label="Fullscreen"
                                v-if="showFullscreen"
                                @click="handleFullscreen">
                            <i class="el-dialog__fullscreen el-icon-full-screen" v-show="!defaultFullScreen"></i>
                            <i class="el-dialog__fullscreen el-icon-copy-document" v-show="defaultFullScreen"></i>
                        </button>
                        <button type="button"
                                class="el-dialog__headerbtn"
                                aria-label="Close"
                                v-if="showClose"
                                @click="handleClose">
                            <i class="el-dialog__close el-icon el-icon-close"></i>
                        </button>
                    </div>
                    <div class="el-dialog__body" v-if="rendered"><slot></slot></div>
                    <div class="el-dialog__footer" v-if="$slots.footer">
                        <slot name="footer"></slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    const Popup = require('element-ui/lib/utils/popup').default;
    const Migrating = require('element-ui/lib/mixins/migrating').default;
    const emitter = require('element-ui/lib/mixins/emitter').default;

    const on = function (el, event, handle) {
        if('addEventListener' in document) {
            el.addEventListener(event, handle, false);
        }else{
            el.attachEvent('on'+event, handle);
        }
    };

    const off = function (el, event, handle) {
        if('removeEventListener' in document) {
            el.removeEventListener(event, handle, false);
        }else{
            el.detachEvent('on'+event, handle);
        }
    };

    export default {
        name: 'BaseDialog',

        mixins: [Popup, emitter, Migrating],

        props: {
            title: {
                type: String,
                default: ''
            },

            modal: {
                type: Boolean,
                default: true
            },

            modalAppendToBody: {
                type: Boolean,
                default: true
            },

            appendToBody: {
                type: Boolean,
                default: false
            },

            lockScroll: {
                type: Boolean,
                default: true
            },

            closeOnClickModal: {
                type: Boolean,
                default: true
            },

            closeOnPressEscape: {
                type: Boolean,
                default: true
            },

            showClose: {
                type: Boolean,
                default: true
            },

            showFullscreen: {
                type: Boolean,
                default: true
            },

            fullscreen: Boolean,

            width: String,

            customClass: {
                type: String,
                default: ''
            },

            top: {
                type: String,
                default: '15vh'
            },
            beforeClose: Function,
            center: {
                type: Boolean,
                default: false
            },

            // 是否允许拖拽
            draggable: {
                type: Boolean,
                default: false
            },
        },

        data() {
            return {
                closed: false,
                defaultFullScreen: false,
                dragData: {
                    // 矩形的X轴
                    rectX: null,
                    // 矩形的Y轴
                    rectY: null,
                    // 当前拖拽点在矩形中的位置
                    dragX: null,
                    // 当前拖拽点在矩形中的位置
                    dragY: null,
                    // 剩余可偏移X轴
                    offsetX: null,
                    // 是否正在拖拽
                    dragging: false
                }
            };
        },

        watch: {
            visible(val) {
                if (val) {
                    this.closed = false;
                    this.$emit('open');
                    this.$el.addEventListener('scroll', this.updatePopper);
                    this.$nextTick(() => {
                        this.$refs.dialog.scrollTop = 0;
                    });
                    if (this.appendToBody) {
                        document.body.appendChild(this.$el);
                    }
                } else {
                    this.$el.removeEventListener('scroll', this.updatePopper);
                    if (!this.closed) this.$emit('close');
                }
            },
            fullscreen(val) {
                if(val) {
                    this.defaultFullScreen = true;
                }
            },
            defaultFullScreen() {
                this.$emit('onResize',true);
            }
        },

        computed: {
            wrapStyle() {
                let style = {};

                if(this.dragData.rectX !== null || this.defaultFullScreen) {
                    style.marginTop = '0';
                } else {
                    if(this.width) {
                        style.width = this.width;
                    }
                    style.marginTop = this.top;
                }
                return style;
            },
            dialogStyle() {
                let style = {};
                if(!this.defaultFullScreen) {
                    if (this.width) {
                        style.width = this.dragData.rectX !== null ? this.width : '100%';
                    }
                    if (this.draggable) {
                        if (this.dragData.rectX !== null || this.dragData.rectY !== null) {
                            style.position = 'absolute';
                            style.marginTop = false;
                        }
                        if (this.dragData.rectX !== null) style.left = `${this.dragData.rectX}px`;
                        if (this.dragData.rectY !== null) style.top = `${this.dragData.rectY}px`;
                    }
                }else{
                    style.marginTop = false;
                }
                return style;
            }
        },

        methods: {
            handleMoveStart (event) {
                if (!this.draggable) return false;
                // 屏蔽鼠标右键，没有人会用右键拖拽，除非鼠标坏了
                if (event.button === 2) return false;
                const dialog = this.$refs.dialog;
                const rect = dialog.getBoundingClientRect();

                this.dragData.rectX = rect.x;
                this.dragData.rectY = rect.y;

                this.dragData.dragX = event.clientX - rect.x;
                this.dragData.dragY = event.clientY - rect.y;

                this.dragData.offsetX = this.$el.clientWidth - dialog.clientWidth;
                this.dragData.dragging = true;

                on(window, 'mousemove', this.handleMoveMove);
                on(window, 'mouseup', this.handleMoveEnd);
            },
            handleMoveMove (event) {
                if (!this.dragData.dragging) return false;

                let {dragX, dragY, offsetX} = this.dragData;

                let left = event.clientX - dragX,
                    top = event.clientY - dragY;

                if(left < 0) {
                    left = 0;
                }
                if(top < 0) {
                    top = 0;
                }
                if (left > offsetX) {
                    left = offsetX;
                }

                this.dragData.rectX = left;
                this.dragData.rectY = top;

            },
            handleMoveEnd () {
                this.dragData.dragging = false;
                off(window, 'mousemove', this.handleMoveMove);
                off(window, 'mouseup', this.handleMoveEnd);
            },
            handleWrapperClick() {
                if (!this.closeOnClickModal) return;
                this.handleClose();
            },
            handleClose() {
                if (typeof this.beforeClose === 'function') {
                    this.beforeClose(this.hide);
                } else {
                    this.hide();
                }
            },
            handleFullscreen() {
                this.defaultFullScreen = !this.defaultFullScreen;
                this.$emit('onFullscreen', this.defaultFullScreen);
            },
            hide(cancel) {
                if (cancel !== false) {
                    this.$emit('update:visible', false);
                    this.$emit('close');
                    this.closed = true;
                    if(!this.fullscreen && this.defaultFullScreen) {
                        this.defaultFullScreen = false;
                    }
                }
            },
            updatePopper() {
                this.broadcast('ElSelectDropdown', 'updatePopper');
                this.broadcast('ElDropdownMenu', 'updatePopper');
            },
            afterLeave() {
                this.$emit('closed');
            }
        },

        mounted() {
            if (this.visible) {
                this.rendered = true;
                this.open();
                if (this.appendToBody) {
                    document.body.appendChild(this.$el);
                }
            }

            if (this.fullscreen) {
                this.defaultFullScreen = true;
            }
        },

        destroyed() {
            // if appendToBody is true, remove DOM node after destroy
            if (this.appendToBody && this.$el && this.$el.parentNode) {
                this.$el.parentNode.removeChild(this.$el);
            }
        }
    };
</script>