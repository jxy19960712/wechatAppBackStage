<template>
    <div class="table">

        <div class="crumbs">
            <el-breadcrumb separator="/">
                <!--<el-breadcrumb-item><i class="el-icon-setting"></i>&nbsp;账户管理</el-breadcrumb-item>-->
                <el-breadcrumb-item><i class="iconfont icon-user"></i>&nbsp;账户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="handle-box">
            <!--<el-button type="primary" icon="plus" class="handle-del mr10" @click="addNews">添加账户</el-button>-->
            <!--<el-button type="primary" icon="delete" class="handle-del mr10" @click="delAll">批量删除</el-button>-->
            <!--<el-date-picker-->
            <!--v-model="value1"-->
            <!--type="date"-->
            <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
            <el-input v-model="select_word" placeholder="筛选关键词" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
        </div>


        <el-table
            :data="tableData"
            border
            style="width: 100%; margin-top: 20px">
            <el-table-column
                label="账户编号"
                width="100">
                <template slot-scope="scope">
                    <p style="text-align: center">1</p>
                </template>
            </el-table-column>
            <el-table-column
                label="账户名称"
                width="300">
                <template slot-scope="scope">
                    <!--<div class="systemmanage-systempic-item">-->
                    <!--<img src="/static/img/management/reserveCadresIcon.png">-->
                    <!--</div>-->
                    <span>账户名</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="账户邮箱">
                <i class="el-icon-time"></i>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                               @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" type="danger"
                               @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="float: right">
            <el-pagination
                @current-change="handleCurrentChange"
                layout="prev, pager, next"
                :total="1000">
            </el-pagination>
        </div>
        <el-dialog title="编辑账户" :visible.sync="outerVisible">
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="选择角色">
                    <el-transfer
                        v-model="value4"
                        :props="{
                          key: 'value',
                          label: 'desc'
                        }"
                        :titles="['未拥有角色', '已拥有角色']"
                        :data="data3">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="选择系统">
                    <el-transfer
                        v-model="value4"
                        :props="{
                          key: 'value',
                          label: 'desc'
                        }"
                        :titles="['未拥有系统', '已拥有系统']"
                        :data="data3">
                    </el-transfer>
                </el-form-item>
                <el-form-item label="选择权限">
                    <el-transfer
                        v-model="value4"
                        :props="{
                          key: 'value',
                          label: 'desc'
                        }"
                        :titles="['未拥有权限', '已拥有权限']"
                        :data="data3">
                    </el-transfer>
                </el-form-item>
            </el-form>


            <div slot="footer" class="dialog-footer">
                <el-button @click="outerVisible = false">取 消</el-button>
                <el-button type="primary" @click="innerVisible = true">保存</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        data() {
            return {
                url: './static/vuetable.json',
                tableData: [],
                cur_page: 1,
                multipleSelection: [],
                select_cate: '',
                select_word: '',
                del_list: [],
                is_search: false,
                outerVisible: false,
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                value1: '',
                data3: [
                    {
                        value: 0,
                        desc: `备选项`
                    }
                ],
                value4: []
            }
        },
        created() {
            for (var i = 1; i < 20; i++) {
                this.data3.push({
                    value: i,
                    desc: `备选项`
                })
            }
            this.getData();
        },
        computed: {
            newsData() {
                const self = this;
                return self.tableData.filter(function (d) {
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                        if (d.name === self.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (d.address.indexOf(self.select_cate) > -1 &&
                            (d.name.indexOf(self.select_word) > -1 ||
                                d.address.indexOf(self.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                })
            }
        },
        methods: {


            onFilterChange() {
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            onSubmit() {
                console.log('submit!');
            },
            addNews() {
                this.outerVisible = true
            },
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            getData() {
                let self = this;
                if (process.env.NODE_ENV === 'development') {
                    self.url = '/ms/table/list';
                }
                ;
                self.$axios.post(self.url, {page: self.cur_page}).then((res) => {
                    self.tableData = res.data.list;
                })
            },
            search() {
                this.is_search = true;
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            handleEdit(index, row) {
                this.outerVisible = true
            },
            handleDelete(index, row) {
                // this.$message.error('删除第' + (index + 1) + '行');
            },
            delAll() {
                const self = this,
                    length = self.multipleSelection.length;
                let str = '';
                self.del_list = self.del_list.concat(self.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += self.multipleSelection[i].name + ' ';
                }
                self.$message.error('删除成功');
                self.multipleSelection = [];
            },
            handleSelectionChange(val) {
                console.log(val);
                this.multipleSelection = val;
            }
        }
    }
</script>

<style scoped>
    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .systemmanage-systempic-item {
        display: inline-block;
        height: 100%;
        box-sizing: border-box;
        padding: 5%;
    }

    .systemmanage-systempic-item img {
        vertical-align: middle;
        background-color: #e35f5a;
        width: 60px;
        border-radius: 5px;
    }
</style>
