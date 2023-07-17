package com.example.panda.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QWritingContentEntity is a Querydsl query type for WritingContentEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QWritingContentEntity extends EntityPathBase<WritingContentEntity> {

    private static final long serialVersionUID = -691089978L;

    public static final QWritingContentEntity writingContentEntity = new QWritingContentEntity("writingContentEntity");

    public final ArrayPath<byte[], Byte> content_img = createArray("content_img", byte[].class);

    public final NumberPath<Integer> wcid = createNumber("wcid", Integer.class);

    public final NumberPath<Integer> wid = createNumber("wid", Integer.class);

    public QWritingContentEntity(String variable) {
        super(WritingContentEntity.class, forVariable(variable));
    }

    public QWritingContentEntity(Path<? extends WritingContentEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QWritingContentEntity(PathMetadata metadata) {
        super(WritingContentEntity.class, metadata);
    }

}

