﻿"use strict";

$(() => {
    if ($('#fingers10').length !== 0) {

        //var table = $('#fingers10').DataTable({
        //    language: {
        //        processing: "Loading Data...",
        //        zeroRecords: "No matching records found"
        //    },
        //    processing: true,
        //    serverSide: true,
        //    orderCellsTop: true,
        //    autoWidth: true,
        //    deferRender: true,
        //    lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
        //    dom: '<"row"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6 text-right"l>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
        //    buttons: [
        //        {
        //            text: 'Export to Excel',
        //            className: 'btn btn-sm btn-dark',
        //            action: function (e, dt, node, config) {
        //                var data = table.ajax.params();
        //                var x = JSON.stringify(data, null, 4);
        //                window.location.href = "/Home/GetExcel?" + $.param(data);
        //            },
        //            init: function (api, node, config) {
        //                $(node).removeClass('dt-button');
        //            }
        //        }
        //    ],
        //    ajax: {
        //        url: '/Home/LoadTable/',
        //        data: function (data) {
        //            return $.extend({}, data, {
        //                "additionalValues[0]": "Additional Parameters 1",
        //                "additionalValues[1]": "Additional Parameters 2"
        //            });
        //        }
        //    },
        //    columns: [
        //        {
        //            data: "Id",
        //            name: "eq",
        //            visible: false,
        //            searchable: false
        //        },
        //        {
        //            data: "Name",
        //            name: "co"
        //        },
        //        {
        //            data: "Position",
        //            name: "eq"
        //        },
        //        {
        //            data: "Offices",
        //            name: "eq"
        //        },
        //        {
        //            data: "DemoNestedLevelOne.Experience",
        //            name: "eq"
        //        },
        //        {
        //            data: "DemoNestedLevelOne.Extension",
        //            name: "eq"
        //        },
        //        {
        //            data: "DemoNestedLevelOne.DemoNestedLevelTwos.StartDates",
        //            render: function (data, type, row) {
        //                if (data)
        //                    return window.moment(data).format("DD/MM/YYYY");
        //                else
        //                    return null;
        //            },
        //            name: "gt"
        //        },
        //        {
        //            data: "DemoNestedLevelOne.DemoNestedLevelTwos.Salary",
        //            name: "lte"
        //        }
        //    ]
        //});

        var table = $('#fingers10').DataTable({
            language: {
                processing: "Loading Data...",
                zeroRecords: "No matching records found"
            },
            processing: true,
            serverSide: true,
            orderCellsTop: true,
            autoWidth: true,
            deferRender: true,
            lengthMenu: [[5, 10, 15, 20, -1], [5, 10, 15, 20, "All"]],
            dom: '<"row"<"col-sm-12 col-md-6"B><"col-sm-12 col-md-6 text-right"l>><"row"<"col-sm-12"tr>><"row"<"col-sm-12 col-md-5"i><"col-sm-12 col-md-7"p>>',
            buttons: [
                {
                    text: 'Export to Excel',
                    className: 'btn btn-sm btn-dark btn-export-excel',
                    action: function (e, dt, node, config) {
                        var t = e.target;
                        var $checkbox = $('#displayedDataOnly');
                        var displayedDataOnly = $checkbox.val();
                        if (t.nodeName !== 'BUTTON') {
                            e.preventDefault();
                            if (displayedDataOnly === 'true') {
                                $checkbox.prop("checked", false);
                                displayedDataOnly = $checkbox.val('false');
                            }
                            else {
                                $checkbox.prop("checked", true);
                                displayedDataOnly = $checkbox.val('true');
                            }

                            return;
                        }
                        else
                            window.location.href = `/Home/GetExcel?displayedDataOnly=${displayedDataOnly}`;
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('dt-button');
                        $(node).html(`Export to Excel <div class="form-check form-check-inline" style="display:inline-flex; margin:0;background: goldenrod;">
  <input style="cursor: pointer;" class="form-check-input" type="checkbox" id="displayedDataOnly" value="true" checked="checked">
  <label style="cursor: pointer;" class="form-check-label" for="displayedDataOnly">displayed data only</label>
</div>`)
                    }
                },

                {
                    text: 'Create',
                    className: 'btn btn-sm btn-success',
                    action: function (e, dt, node, config) {
                        $('#createModal').modal('show');
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('dt-button');
                    }
                }
            ],
            ajax: {
                type: "POST",
                url: '/Home/LoadTable/',
                contentType: "application/json; charset=utf-8",
                async: true,
                headers: {
                    "XSRF-TOKEN": document.querySelector('[name="__RequestVerificationToken"]').value
                },
                data: function (data) {
                    let additionalValues = [];
                    additionalValues[0] = "Additional Parameters 1";
                    additionalValues[1] = "Additional Parameters 2";
                    data.AdditionalValues = additionalValues;

                    return JSON.stringify(data);
                }
            },
            columns: [
                {
                    data: "Id",
                    name: "eq",
                    visible: false,
                    searchable: false,
                    orderable: false
                },
                {
                    data: "Name",
                    name: "co"
                },
                {
                    data: "Position",
                    name: "eq"
                },
                {
                    data: "Offices",
                    name: "eq"
                },
                {
                    data: "DemoNestedLevelOne.Experience",
                    name: "eq"
                },
                {
                    data: "DemoNestedLevelOne.Extension",
                    name: "eq"
                },
                {
                    data: "DemoNestedLevelOne.DemoNestedLevelTwos.StartDates",
                    render: function (data, type, row) {
                        if (data)
                            return window.moment(data).format("DD/MM/YYYY");
                        else
                            return null;
                    },
                    name: "gt"
                },
                {
                    data: "DemoNestedLevelOne.DemoNestedLevelTwos.Salary",
                    name: "lte"
                },
                {
                    orderable: false,
                    width: 100,
                    data: "DemoNestedLevelOne.DemoNestedLevelTwos.Action",
                    render: function (data, type, row) {
                        return `<div>
                                    <button type="button" class="btn btn-sm btn-info mr-2 btnEdit" data-key="${row.Id}">Edit</button>
                                    <button type="button" class="btn btn-sm btn-danger btnDelete" data-key="${row.Id}">Delete</button>
                                </div>`;
                    }
                }
            ]
        });

        table.columns().every(function (index) {
            $('#fingers10 thead tr:last th:eq(' + index + ') input')
                .on('keyup',
                    function (e) {
                        if (e.keyCode === 13) {
                            table.column($(this).parent().index() + ':visible').search(this.value).draw();
                        }
                    });
        });

        $(document)
            .off('click', '#btnCreate')
            .on('click', '#btnCreate', function () {
                fetch('/Home/Create/',
                    {
                        method: 'POST',
                        cache: 'no-cache',
                        body: new URLSearchParams(new FormData(document.querySelector('#frmCreate')))
                    })
                    .then((response) => {
                        table.ajax.reload();
                        $('#createModal').modal('hide');
                        document.querySelector('#frmCreate').reset();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });

        $(document)
            .off('click', '.btnEdit')
            .on('click', '.btnEdit', function () {
                const id = $(this).attr('data-key');

                fetch(`/Home/Edit/${id}`,
                    {
                        method: 'GET',
                        cache: 'no-cache'
                    })
                    .then((response) => {
                        return response.text();
                    })
                    .then((result) => {
                        $('#editPartial').html(result);
                        $('#editModal').modal('show');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });

        $(document)
            .off('click', '#btnUpdate')
            .on('click', '#btnUpdate', function () {
                fetch('/Home/Edit/',
                    {
                        method: 'PUT',
                        cache: 'no-cache',
                        body: new URLSearchParams(new FormData(document.querySelector('#frmEdit')))
                    })
                    .then((response) => {
                        table.ajax.reload();
                        $('#editModal').modal('hide');
                        $('#editPartial').html('');
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });

        $(document)
            .off('click', '.btnDelete')
            .on('click', '.btnDelete', function () {
                const id = $(this).attr('data-key');

                if (confirm('Are you sure?')) {
                    fetch(`/Home/Delete/${id}`,
                        {
                            method: 'DELETE',
                            cache: 'no-cache'
                        })
                        .then((response) => {
                            table.ajax.reload();
                        })
                        .catch((error) => {
                            console.log(error);
                        });
                }
            });

        $('#btnExternalSearch').click(function () {
            table.column('0:visible').search($('#txtExternalSearch').val()).draw();
        });
    }
});
